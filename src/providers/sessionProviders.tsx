import type { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { supabase } from "../lib/subabase";

//  se  crea  el  la interfaz   que  se utilizara el  context
interface SessionContextProps{
    session: Session | null;
    user: User | null;
}
// inicializa el  contexto usando la interfaz  creada  // Session , user
const sessionContext  =  createContext<SessionContextProps>({
    session:null,
     user:null,
    })

interface SessionProviderProps{
    children:ReactNode
}

export const SessionProvider =({children}:SessionProviderProps)=>{
    const  [session, setSession]= useState<Session|null>(null)

     useEffect(()=>{
        supabase.auth.getSession().then(({ data})=>
            setSession(data.session))
        const  {data: listener} = supabase.auth.onAuthStateChange(
            (_event, newSession) => setSession(newSession)
        )
        return ()=> listener.subscription.unsubscribe()
     },[])
  return(
    <sessionContext.Provider value={{session, user: session?.user || null}}>
        {children}
    </sessionContext.Provider>
  )
     
}
export const  useSession =(): SessionContextProps => useContext(sessionContext)