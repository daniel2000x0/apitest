
import { FormCalendar } from "../../components/forms/formsevent/formsevent"

import Navbar from "../nabvar/Nabvar"
import './home.css'
const  Dashboard: React.FC =()=>{


return( 
    <>
      <Navbar/>
   <div className="container">
        <FormCalendar />
      </div>
    </>
  
)
}


export default Dashboard