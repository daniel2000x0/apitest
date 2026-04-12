import z from "zod";
import EventInput from "../eventsCustom/InputEvent";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import { createCalendarEvent } from "../../../services/googleCalendar";
import { useState } from "react";
export const zodschema = z
  .object({
    eventname: z
      .string()
      .trim()
      .min(3, { message: "El evento debe tener al menos 3 caracteres" })
      .max(80, { message: "El nombre del evento es demasiado largo" }),

    eventdescription: z
      .string()
      .trim()
      .min(5, { message: "Agrega más información del evento" })
      .max(300, { message: "La descripción no puede superar 300 caracteres" }),
         start: z.any().nullable(),
    end: z.any().nullable()
  });
   export  type  EventValues = z.infer<typeof zodschema>
  interface FormsCalendarProps {
  startf?: Date;
  endf?: Date;
}
export  const   FormsCalendar = ({ startf, endf }: FormsCalendarProps)=>{
      const {control, handleSubmit  , reset,formState:{errors} } =  useForm<EventValues>({
           resolver:zodResolver(zodschema),
              mode: "onBlur",
               defaultValues:{
                   eventname:"",
                   eventdescription:"",  
                   start:startf,
                   end: endf
               }
   
       });
  const [startTime, setStartTime] = useState("08:00");
const [endTime, setEndTime] = useState("09:00");
const combineDateTime = (date: Date, time: string) => {
  const [hours, minutes] = time.split(":").map(Number);

  const newDate = new Date(date);
  newDate.setHours(hours);
  newDate.setMinutes(minutes);

  return newDate;
};
   const  submithandler:SubmitHandler  <EventValues>=(data) =>{

 const startFinal = combineDateTime(data.start, startTime);
const endFinal = combineDateTime(data.start, endTime);
   
   
      const evento =  {
    eventName: data.eventname,
        eventDescription :data.eventdescription,
        start :startFinal,
        end:startFinal,
      }
     createCalendarEvent(evento);
   console.log(data)
   reset({
  eventname: "",
  eventdescription: "",
  start: startf,
  end: endf
});
  
   
    }


   return (

    <form onSubmit={handleSubmit(submithandler)}>

<div className="form-container">
  <EventInput
  name="eventname"
  control={control}
  label="eventname"
  type="text"
  error={errors.eventname}
/>  
  <EventInput
  name="eventdescription"
  control={control}
  label="eventdescription"
  type="text"
  error={errors.eventdescription}
/>

    <h2>Detalle del evento</h2>
<p>
  {startf ? startf.toDateString() : "Sin fecha"}
</p>

    <label>Hora inicio</label>
    <input
      type="time"
      value={startTime}
      onChange={(e) => setStartTime(e.target.value)}
    />

    <label>Hora fin</label>
    <input
      type="time"
      value={endTime}
      onChange={(e) => setEndTime(e.target.value)}
    />
  <div className="form-actions">
  <button type="submit">Crear evento</button>
</div>
</div>
</form>

   );
}