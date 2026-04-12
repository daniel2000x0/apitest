import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { supabase } from "../lib/subabase";
import toJSDate from "../utils/dates";


export interface eventCalendar{
  summary: string;
  description: string;
  start: { dateTime: string };
  end: { dateTime: string };

}


export interface eventProps {
  eventName: string;
  eventDescription: string;
  start: Date;
  end: Date;
}
export async function getallevent(){
  const now = new Date().toISOString();
  const googleToken = await getGoogleToken();
 const url  = new URL("https://www.googleapis.com/calendar/v3/calendars/primary/events");
 url.searchParams.set("timeMin",now)
  url.searchParams.set("singleEvents","true")
   url.searchParams.set("orderBy","startTime")
 const response = await fetch(
url.toString(),
  {
    headers: {
      Authorization: `Bearer ${googleToken}`
    }
  }
);
if(!response.ok){
   const error = await response.json();
    console.error("Google API error:", error);
    throw new Error("Error obteniendo eventos");
}
    const events = await response.json();
const data = events.items
    .filter((event: any) =>
      event.eventType !== "birthday" &&
      event.source?.title !== "Contacts"
    )
    .map((event: any) => ({
      id: event.id,
      title: event.summary,
      description: event.description || "",
      start: event.start?.dateTime || event.start?.date,
      end: event.end?.dateTime || event.end?.date,
      link: event.htmlLink
    }));
  console.log(events);

  return data
}



export async function createCalendarEvent({
  eventName,
  eventDescription,
  end,
  start
}: eventProps) {
  
  const googleToken = await getGoogleToken();
  console.log(googleToken)
  if (!start) {
  alert("Selecciona una fecha");
  return;
}
const startDate =toJSDate(start)
const endDate =toJSDate(end)
console.log("start:", start);
console.log("end:", end);

console.log("startDate:", new Date(start));
console.log("endDate:", new Date(end));
  const evento = {
    summary: eventName,
    description: eventDescription,
     start: {
        dateTime: startDate.toISOString(), // ✅ ya es Date
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
      end: {
        dateTime: endDate.toISOString(),
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      },
  };

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events",
    {
      method: "POST",
      headers: {
        Authorization: "Bearer " + googleToken,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(evento)
    }
  );

  const data = await response.json();
  console.log(" se ha  creado e eevento safisfactoriamente")
  console.log(data);
  return data;
}


  async function getGoogleToken() {
  const { data, error } = await supabase.auth.getSession();

  if (error) {
    console.error("Error obteniendo sesión:", error);
    return null;
  }

  const googleToken = data.session?.provider_token;

  return googleToken;
}

export async  function deleteCalendar (eventId : string){
    const token = await getGoogleToken();
    if(!token){
      throw new Error("no hay token");
      
    }
 
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );
  if (!response.ok) {
  if (response.status === 410) {
    console.warn("El evento ya no existe (ya fue eliminado)");

    return; 
  }

  const error = await response.json();
  console.error("Google API error:", error);
  throw new Error("Error eliminando evento");
}
}