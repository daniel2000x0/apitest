import { useNavigate } from "react-router-dom";
import { supabase } from "../../lib/subabase";
//import { useSession } from "../../providers/sessionProviders";
import "./navbar.css";

const Navbar = () => {
     ///   const {user}= useSession()
       const navigate = useNavigate();
    const handlelagout = async () =>{
       const { error } =    await supabase.auth.signOut()
         if (error) {
    console.error("Error al cerrar sesión:", error);
  } else {
    navigate("/");
  }
    }
    const  event = ()=>{
     navigate("/events")
    } 
     const  home = ()=>{
     navigate("/dashboard")
    } 
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        📅 CalendarApp
      </div>

      <ul className="navbar-menu">
        <li onClick={home}>Inicio</li>
        <li  onClick={event}>Eventos</li>
        <li>Calendario</li>
        
      </ul>

      <div className="navbar-user">
      <button onClick={handlelagout}>log out</button>
      </div>
    </nav>
  );
};

export default Navbar;