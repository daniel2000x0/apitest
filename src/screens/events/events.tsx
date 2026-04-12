import { useEffect, useState } from "react"
import { deleteCalendar, getallevent } from "../../services/googleCalendar"

import Navbar from "../nabvar/Nabvar"
import "./events.css"
export type EventType = {
id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  link?: string;
};
const  Events = ()=>{
    const [events, setEvents] =useState<EventType[]>([])
    const [loading,setLoading] =  useState(true)
    const  loadData =  async ()=>{
        try {
            const  data =  await getallevent();
            setEvents(data)
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
const [loadingId, setLoadingId] = useState<string | null>(null);
const  eliminar =(id: string)=>{
  setLoadingId(id);
try {
    deleteCalendar(id)
    setEvents((prev)=> prev.filter((e)=>e.id !==id))
} catch (error) {
    throw new Error("error al eliminar");
    
} finally{
    setLoadingId(null)
}
}
 return(
    <>
    <Navbar/>
  <div className="container-tabla">
      <h1>Eventos</h1>
        {loading && <p>Cargando...</p>}
<table className="tabla">
  <thead>
    <tr>
      <th>Título</th>
      <th>Inicio</th>
      <th>Acciones</th>
    </tr>
  </thead>

  <tbody>
    {!loading &&
      events.map((event: any) => (
        <tr key={event.id}>
          <td>{event.title}</td>
          <td>{event.start}</td>
          <td>
            <button onClick={() => eliminar(event.id)}   disabled={loadingId === event.id}  >
              Eliminar
            </button>
          </td>
        </tr>
      ))}
  </tbody>
</table>

     
    </div></>
      
 )
}

export  default Events