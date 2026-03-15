
import './App.css'
import { SessionProvider, useSession } from './providers/sessionProviders'
import Dashboard from './screens/home/Home'
import Login from './screens/LogIn/Login'
function App() {

  return (
        <SessionProvider>
      {/* Aquí decides qué mostrar */}
      <Main />
    </SessionProvider>
  )
}
function Main  () {
  const {session} = useSession()
  if(!session){
    return <Login/>

  }

  return <Dashboard/>
}

export default App
