import { ToastContainer, toast } from 'react-toastify'
import { GameContextProvider } from './components/context/GameContext'
import { UserContextProvider } from './components/context/UserContext'
import { System } from './components/System'
import 'react-toastify/dist/ReactToastify.css'
export const notifySuccess = (message: string) => {
  toast.success(message,{
    position: toast.POSITION.BOTTOM_RIGHT,
    style: {background: "#333"}
  });
}
export const notifyError = (message: string) => {
  toast.error(message,{
    position: toast.POSITION.BOTTOM_RIGHT,
    style: {background: "#333", color:"white"}
  });
}
function App() {
  return (
    <>
      <UserContextProvider>
        <GameContextProvider>
          <System/>
          
        </GameContextProvider>
      </UserContextProvider>
      <ToastContainer toastClassName={""}/>
    </>
  )
}

export default App
