import { supabase } from "../../lib/subabase";
//import { useSession } from "../../providers/sessionProviders";
import "./navbar.css";

const Navbar = () => {
     ///   const {user}= useSession()
    const handlelagout = async () =>{
        await supabase.auth.signOut()
    }
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        📅 CalendarApp
      </div>

      <ul className="navbar-menu">
        <li>Inicio</li>
        <li>Eventos</li>
        <li>Calendario</li>
        
      </ul>

      <div className="navbar-user">
      <button onClick={handlelagout}>log out</button>
      </div>
    </nav>
  );
};

export default Navbar;