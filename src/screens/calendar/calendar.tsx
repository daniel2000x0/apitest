import { Calendar, dateFnsLocalizer, momentLocalizer, type SlotInfo } from 'react-big-calendar'
import { format, parse, startOfWeek, getDay } from 'date-fns'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { es } from 'date-fns/locale'
import moment from 'moment';
import './calendar.css'
import Navbar from '../nabvar/Nabvar'
import { useEffect, useState } from 'react'

import { FormsCalendar } from '../../components/forms/formsCalendar/formscalendar'
import type { EventType } from '../events/events'
import { getallevent, type eventCalendar } from '../../services/googleCalendar'
const locales = {
  es: es,
}
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
})

export  default  function CalendarApp() {
    
const [open, setOpen] = useState(false)
    const [loading,setLoading] =  useState(true)
const [slotInfo, setSlotInfo] = useState<SlotInfo | null>(null)
  const [event, setEvent] = useState<EventType[]>([]);
  const  loadData =  async ()=>{
    
         try {
             const  data =  await getallevent();  
                 console.log("DATA COMPLETA:", data);
    console.log("ITEMS:", data.items);
             setEvent(data  || [])
         } catch (error) {
                      throw new Error("Error  api");
         } finally{
   setLoading(false)
         }
     }
 //useEffect ejecuta efectos secundarios después del renderizado
     useEffect(()=>{
            loadData();
     },[])

   const eventsFormatted   = event.length
  ? event.map((e: any) => ({
   title: e.title,
  start: new Date(e.start),
  end: new Date(e.end),
  description: e.description,
})): [];
   console.log(eventsFormatted)
    return(
<>
  <Navbar />

  <div className="container-calendar">
    <h1>Calendario</h1>

    <div className="calendar-wrapper">
      <Calendar
        localizer={localizer}
        events={eventsFormatted}
        startAccessor="start"
        endAccessor="end"
        selectable
         views={["month", "week", "day"]} 
         style={{ height: 500 }}
     defaultView="week"             
     step={30}                      
      timeslots={2} 
        onSelectSlot={(slot) => {
       

    setSlotInfo(slot)
    setOpen(true)
  }}
      />
    </div>

{open && (
  <div className="modal-overlay">
    <div className="modal-content">
      
      <button  className="close-btn" onClick={() => setOpen(false)}>
       
      </button>

    <FormsCalendar 
  startf={slotInfo?.start } 
  endf={slotInfo?.end} 
/>

    </div>
  </div>
)}


  </div>
</>
    
    )
}