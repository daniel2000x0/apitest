import { Routes, Route, Navigate } from "react-router-dom";
import Privacy from "../screens/privacy/privacy";
import Login from "../screens/LogIn/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/privacy" element={<Privacy />} />
        <Route path="/login" element={<Login />} />
         <Route path="/" element={<Login />} />
             <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}