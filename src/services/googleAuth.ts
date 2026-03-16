import { supabase } from "../lib/subabase";
import { useNavigate } from "react-router-dom";

export async function googleSignIn() {
  
   const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar'
      }
    });
    if(error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
}
 export  async function signOut() {
    await supabase.auth.signOut();
  }
