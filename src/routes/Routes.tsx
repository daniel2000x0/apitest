import { Routes, Route, Navigate } from "react-router-dom";
import Privacy from "../screens/privacy/privacy";
import Login from "../screens/LogIn/Login";
import Home from "../screens/home/Home";
import Events from "../screens/events/events";


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<Login />} />
           <Route path="/events" element={<Events />} />
           <Route path="/dashboard" element={<Home />} />
             <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}