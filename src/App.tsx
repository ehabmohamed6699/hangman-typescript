import { ToastContainer, toast } from 'react-toastify'
import { GameContextProvider } from './components/context/GameContext'
import { UserContextProvider } from './components/context/UserContext'
import { System } from './components/System'
import 'react-toastify/dist/ReactToastify.css'
import { QueryClient, QueryClientProvider } from 'react-query'
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

const queryClient = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <GameContextProvider>
          <System/>
          
        </GameContextProvider>
      </UserContextProvider>
      <ToastContainer toastClassName={""}/>
    </QueryClientProvider>
  )
}

export default App
