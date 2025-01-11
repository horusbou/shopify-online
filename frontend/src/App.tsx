import { useEffect } from "react"
import { parsToCartItem, useGlobalContext } from "./context/context"
import Home from "./layout/Home"
import Navigator from "./layout/Navigator"
import Sidebar from "./layout/SideBar"
import {BrowserRouter as Router, useNavigate} from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { apiGetUserCart, setupInterceptors } from "./utils/api"
import { useError } from './context/ErrorContext';
import ErrorModal from './components/ErrorModal';
import { UserType } from "./types"

function App() {
  const { state,login, setCart } = useGlobalContext()
  const { errorMessage, setErrorMessage } = useError();
  let navigate = useNavigate();

  const handleClose = ()=>{
    setErrorMessage(null)
    navigate("/")
  }

  useEffect(() => {
    setupInterceptors(setErrorMessage);
  }, []);

  useEffect(()=>{
    const accessToken:string|null = localStorage.getItem("accessToken");
    if(accessToken){
      const user:UserType = jwtDecode(accessToken)
      login(user)
    }
    const getCartFromBackend = async ()=>{
      const cart = await apiGetUserCart()
      setCart(parsToCartItem(cart))
    }
    getCartFromBackend()
  },[])


  return (
      <>
            <Navigator/>
            <Sidebar isShowing={state.showSidebar} />
            <Home/>
            <ErrorModal message={errorMessage} onClose={handleClose} />
      </>
  )
}

export default App
