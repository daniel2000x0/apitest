
import CustomForm from "../../components/forms/formsCustom/CustomForms"
import './Login.css'
import { googleSignIn } from "../../services/googleAuth"
import { Navigate, useNavigate } from "react-router-dom";
import { useSession } from "../../providers/sessionProviders";
const Login : React.FC =()=>{
 
  const navigate = useNavigate();
  const { session } = useSession();

  // si ya hay sesión → redirige al dashboard
  if (session) {
    return <Navigate to="/dashboard" />;
  }

  async function handleGoogleLogin() {
    try {
      await googleSignIn();
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }
   
    return(
  <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <div style={{ textAlign: "center", marginBottom: "30px" }}>
      
      {/* Logo */}
      <svg
        width="70"
        height="70"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ marginBottom: "10px" }}
      >
        <rect x="3" y="4" width="18" height="18" rx="4" fill="#6366f1" />
        <path
          d="M8 12H16M12 8V16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>

      {/* Título */}
      <h1 style={{ fontSize: "28px", fontWeight: "600" }}>
        Calendar Manager
      </h1>

      <p style={{ opacity: 0.7 }}>
        Inicia sesión para continuar
      </p>
    </div>
        </div>

        <div className="login-body">
              <CustomForm/>
        </div>

        <div className="login-footer">
       <div className="google-login">
<button
  className="google-btn"
  onClick={() => {
    console.log("Login clicked");
    handleGoogleLogin();
  }}
>
    
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.3 0 6.3 1.1 8.7 3.3l6.5-6.5C35.2 2.4 30 0 24 0 14.7 0 6.7 5.3 2.7 13l7.7 6C12.2 13.2 17.6 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.1 24.5c0-1.7-.2-3.4-.5-5H24v9.5h12.4c-.5 2.7-2 5-4.2 6.6l6.5 5c3.8-3.5 6-8.7 6-16.1z"/>
      <path fill="#FBBC05" d="M10.4 28.9c-1-2.7-1-5.6 0-8.3l-7.7-6C.9 18.3 0 21 0 24s.9 5.7 2.7 8.3l7.7-3.4z"/>
      <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-6.5-5c-2.1 1.4-4.9 2.3-9.5 2.3-6.4 0-11.8-3.7-13.7-9l-7.7 6C6.7 42.7 14.7 48 24 48z"/>
    </svg>

    <span>Continuar con Google</span>

  </button>
</div>
        </div>
      </div>
    </div>
    )
}


export default Login