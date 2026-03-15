import { CalendarDate, getLocalTimeZone } from "@internationalized/date";
import { supabase } from "../lib/subabase";


export interface eventProps{
    eventName:String;
    eventDescription: String;
  start: CalendarDate
  end: CalendarDate
}


async function getallevent(){
  const googleToken = await getGoogleToken();

  const evento = await fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events`,{
    method:"GET",
    headers:{
           Authorization: "Bearer " + googleToken
    }

  });
    const events = await evento.json();

    
  console.log(events);

  return events
}



export async function createCalendarEvent({
  eventName,
  eventDescription,
  end,
  start
}: eventProps) {
  const startDate = start.toDate(getLocalTimeZone());
  const endDate = end.toDate(getLocalTimeZone());
  const googleToken = await getGoogleToken();
  console.log(googleToken)

  const evento = {
    summary: eventName,
    description: eventDescription,
    start: {
      dateTime: startDate.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    },
    end: {
      dateTime: endDate.toISOString(),
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
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