import { useEffect, useContext, createContext, useReducer } from "react"
import reducer from "../reducer/reducer"
import { defaultState } from "../reducer/defaultState"
import {
  SHOW_SIDEBAR,
  HIDE_SIDEBAR,
  SHOW_OVERLAY,
  HIDE_OVERLAY,
  SHOW_CART,
  HIDE_CART,
  READ_SCREENWIDTH,
  INCREASE_AMOUNT,
  DECREASE_AMOUNT,
  REMOVE_ITEM,
  GET_CART,
  ADD_TO_CART,
  UPDATE_CART,
  GET_TOTAL_CART,
  SET_PRODUCTS,
  SHOW_LOGIN,
  HIDE_LOGIN,
  LOGIN,
  LOGOUT
} from "../reducer/action"
import { Cart, Product } from "../types";
import { UserType } from "../types";
import { apiAddToCart, removeItemInCart } from "../utils/api";

interface AppContextType {
    state: typeof defaultState;  // Assuming defaultState is already typed
    showSidebar: () => void;
    hideSidebar: () => void;
    showImageOverlay: () => void;
    hideImageOverlay: () => void;
    showCart: () => void;
    hideCart: () => void;
    showLogin:()=>void;
    hideLogin:()=>void;
    increaseAmount: (id: string,limit:number) => void;
    decreaseAmount: (id: string) => void;
    addToCart: (amount: number, productId: string) => void;
    updateCart: () => void;
    getTotalCartAmount: () => void;
    removeItem: (id: string) => void;
    readScreenWidth: () => void;
    setProducts:(product:Product[])=>void;
    login:(user:UserType)=>void;
    logout:()=>void;
    setCart : (cart:Product[])=>void
  }
const defaultAppContext: AppContextType = {
  state: defaultState,  // assuming defaultState is typed
  showSidebar: () => {},  // Default empty function
  hideSidebar: () => {},  // Default empty function
  showImageOverlay: () => {},  // Default empty function
  hideImageOverlay: () => {},  // Default empty function
  showCart: () => {},  // Default empty function
  hideCart: () => {},  // Default empty function
  showLogin:() => {},
  hideLogin:() => {},
  increaseAmount: (_id: string, _limit:number) => {},  // Default empty function
  decreaseAmount: (_id: string) => {},  // Default empty function
  addToCart: (_amount: number, _productId: string) => {},  // Default empty function
  updateCart: () => {},  // Default empty function
  getTotalCartAmount: () => {},  // Default empty function
  removeItem: (_id: string) => {},  // Default empty function
  readScreenWidth: () => {},  // Default empty function
  setProducts:(_product:Product[])=>{},
  login: ()=>{},
  logout:()=>{},
  setCart:(cart:Product[])=>{}
}

export default defaultAppContext;
 

const AppContext = createContext<AppContextType>(defaultAppContext)

const AppProvider = ({ children }:{children:React.ReactNode}) => {
  const [state, dispatch] = useReducer(reducer, defaultState)

  const showSidebar = () => {
    dispatch({ type: SHOW_SIDEBAR })
  }

  const hideSidebar = () => {
    dispatch({ type: HIDE_SIDEBAR })
  }

  const showImageOverlay = () => {
    dispatch({ type: SHOW_OVERLAY })
  }

  const hideImageOverlay = () => {
    dispatch({ type: HIDE_OVERLAY })
  }

  const showCart = () => {
    dispatch({ type: SHOW_CART })
  }

  const hideCart = () => {
    dispatch({ type: HIDE_CART })
  }

  const showLogin = () => {
    dispatch({ type: SHOW_LOGIN })
  }

  const hideLogin = () =>{
    dispatch({ type: HIDE_LOGIN })
  }

  const increaseAmount = (id:string,limit:number) => {
    dispatch({ type: INCREASE_AMOUNT, payload: { id,limit } })
  }

  const decreaseAmount = (id:string) => {
    dispatch({ type: DECREASE_AMOUNT, payload: { id } })
  }

  const addToCart = async (amount:number, productId:string) => {

    if (!amount) return
    dispatch({
      type: ADD_TO_CART,
      payload: {
        productId,
        amount,
      },
    })
    await apiAddToCart(productId,amount)
    
  }

  const updateCart = () => {
    dispatch({ type: UPDATE_CART })
  }

  const getTotalCartAmount = () => {
    dispatch({ type: GET_TOTAL_CART })
  }

  const setCart =(cart:Product[])=>{
    dispatch({type: GET_CART, payload: cart })
  }

  const removeItem = async (id:string) => {
    dispatch({ type: REMOVE_ITEM, payload: { id } })
    let cart = await removeItemInCart(id)
    setCart(parsToCartItem(cart?.cartProducts))
  }

  const readScreenWidth = () => {
    dispatch({ type: READ_SCREENWIDTH, payload: window.innerWidth })
  }
  const login = (user:UserType)=>{
    dispatch({ type:LOGIN, payload:user })
  }
  const logout = ()=>{
    localStorage.removeItem("accessToken")
    dispatch({type:LOGOUT})
  }

  const setProducts = (products:Product[])=>{
    dispatch({ type:SET_PRODUCTS, payload:products})
  }
  useEffect(() => {
    getTotalCartAmount()
  }, [state.amount, state.cart])

  useEffect(() => {
    window.addEventListener("resize", readScreenWidth)
    // Cleanup function to remove eventlistener after reading screenwidth, hide overlay if showing when screen width is below 768
    if (state.screenWidth < 768 && state.showingOverlay) {
      dispatch({ type: HIDE_OVERLAY })
    }
    if (state.screenWidth > 768 && state.showSidebar) {
      dispatch({ type: HIDE_SIDEBAR })
    }

    return () => window.removeEventListener("resize", readScreenWidth)
  }, [state.screenWidth])


  return (
    <AppContext.Provider
      value={{
        state,
        showSidebar,
        hideSidebar,
        showImageOverlay,
        hideImageOverlay,
        showCart,
        hideCart,
        increaseAmount,
        decreaseAmount,
        addToCart,
        updateCart,
        removeItem,
        getTotalCartAmount,
        readScreenWidth,
        setProducts,
        showLogin,
        hideLogin,
        login,
        logout,
        setCart
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { useGlobalContext, AppProvider }

export function parsToCartItem(cart: Cart[]): Product[] {
  console.log("c=>",cart)
  return cart.map(c=>({
    id: c?.product.id,
    name: c?.product.name,
    image: "http://localhost:3000"+c?.product.image,
    price: c?.product.price,
    amount: c?.quantity,
    description: c?.product.description
  }))
}
