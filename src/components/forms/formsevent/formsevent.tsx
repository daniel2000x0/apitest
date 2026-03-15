import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";
import z from "zod";
import { useState } from "react";
import EventInput from "../eventsCustom/InputEvent";
import {useDateFormatter} from 'react-aria';
import "./formevent.css"
import { DatePicker } from "../datePicker/DatePicker";
import { getLocalTimeZone, parseZonedDateTime, ZonedDateTime, type CalendarDate } from "@internationalized/date";
import { createCalendarEvent } from "../../../services/googleCalendar";
import { useSession } from "../../../providers/sessionProviders";


const now = new Date();


const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

const startISO = now.toISOString().slice(0,19);
const endISO = new Date(now.getTime() + 60 * 60 * 1000).toISOString().slice(0,19);

const startDefault = parseZonedDateTime(`${startISO}[${zone}]`);
const endDefault = parseZonedDateTime(`${endISO}[${zone}]`);


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
  }).superRefine((data, ctx) => {
    if (data.start && data.end) {
      if (data.end.toAbsoluteString() < data.start.toAbsoluteString()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "La fecha final debe ser mayor que la inicial",
          path: ["end"]
        });
      }
    }
  });

  export  type  EventValues = z.infer<typeof zodschema>

  export  const   FormCalendar = ()=>{

const [start, setStart] = useState<ZonedDateTime | null>(startDefault);
const [end, setEnd] = useState<ZonedDateTime | null>(endDefault);
    const {control, handleSubmit ,formState:{errors} } =  useForm<EventValues>({
        resolver:zodResolver(zodschema),
           mode: "onBlur",
            defaultValues:{
                eventname:"",
                eventdescription:"",  
                start:startDefault,
                end:endDefault
            }

    });
    const  submithandler:SubmitHandler  <EventValues>=(data) =>{
      const evento =  {
    eventName: data.eventname,
        eventDescription :data.eventdescription,
        start :data.start,
        end:data.end,
      }
      createCalendarEvent(evento);
   console.log(data)
    }
let formatter = useDateFormatter({ dateStyle: 'full' });


const handleStartChange = (value: ZonedDateTime | null) => {
  setStart(value);

  if (value) {
    setEnd(value.add({ hours: 1 }));
  }
};
const formatLocalDate = (date: any) => {
  if (!date) return "";
  return formatter.format(date.toDate(getLocalTimeZone()));
};
    return(
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

<div className="date-range">

  <div className="date-field">
    <label className="form-label">Fecha de inicio</label>
    <DatePicker id="start" value={start}   onChange={handleStartChange} />
  <p className="date-info">
    {start
      ? `Inicio seleccionado: ${formatLocalDate(start)}`
      : "Seleccione la fecha de inicio"}
  </p>
  </div>

  <div className="date-field">
    <label className="form-label">Fecha final</label>
    <DatePicker value={end} onChange={setEnd}  id="end" />
   <p className="date-info">
    {end
      ? `Fin seleccionado: ${formatLocalDate(end)}`
      : "Seleccione la fecha final"}
  </p>
  </div>

</div>

<div className="form-actions">
  <button type="submit">Crear evento</button>
</div>

</div>

</form>

    )
   }

 