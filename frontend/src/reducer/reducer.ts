import { Product } from "../types";
import { ActionType, HIDE_SIDEBAR, SHOW_OVERLAY, SHOW_SIDEBAR,HIDE_CART,HIDE_OVERLAY,INCREASE_AMOUNT,REMOVE_ITEM,DECREASE_AMOUNT,ADD_TO_CART,SHOW_CART,READ_SCREENWIDTH,UPDATE_CART,GET_TOTAL_CART, SET_PRODUCTS, SHOW_LOGIN, HIDE_LOGIN, LOGOUT, LOGIN, GET_CART, SET_REFETCH, RESET_REFETCH } from "./action";
import { State, defaultState } from "./defaultState";

const reducer = (state: State, action: ActionType): State => {
  switch (action.type) {
    case SHOW_SIDEBAR:
      return { ...state, showSidebar: true };
    case HIDE_SIDEBAR:
      return { ...state, showSidebar: false };
    case SHOW_OVERLAY:
      if (state.screenWidth < 769) return state;
      return { ...state, showingOverlay: true };
    case HIDE_OVERLAY:
      return { ...state, showingOverlay: false };
    case SHOW_CART:
      return { ...state, showingCart: true };
    case HIDE_CART:
      return { ...state, showingCart: false };
    case SHOW_LOGIN:
      return {...state, showLogin:true}
    case HIDE_LOGIN:
      return {...state, showLogin:false}
    case INCREASE_AMOUNT:
      return { ...state, amount: state.amount>=action.payload.limit ? state.amount: state.amount + 1 };
    case DECREASE_AMOUNT:
      return { ...state, amount: Math.max(0, state.amount - 1) };
    case ADD_TO_CART: {
      const { productId, amount } = action.payload;
      const hasItem = state.cart.find(
        (product) => product.id === productId
      );
      if (hasItem) {
        const updatedItem = { ...hasItem, amount };
        return {
          ...state,
          amount: 0,
          cart: state.cart.map((product) =>
            product.id === productId ? updatedItem : product
          ),
        };
      } else {
        const product:Product|undefined = state.products.find(el=>el.id===productId)
        if(product){
          const newItem = { ...product, amount };

          return { ...state, amount: 0, cart: [...state.cart,newItem] };
        }else
        return state
        

      }
    }
    case UPDATE_CART:
      return { ...state };
    case REMOVE_ITEM:
      return { ...state, cart: [...state.cart.filter(el=>el.id!==action.payload.id)] };
    case GET_TOTAL_CART: {
      const totalCartCount = state.cart.reduce(
        (total, currentItem) => total + currentItem.amount,
        0
      );
      return { ...state, totalCartSize: totalCartCount };
    }
    case READ_SCREENWIDTH:
      return { ...state, screenWidth: action.payload };
    case SET_PRODUCTS:
      return {...state, products: action.payload}
    case LOGIN:
      return {...state, user: action.payload}
    case LOGOUT:
      return {...defaultState, user:null}
    case GET_CART:
      return {...state, cart: action.payload}
    case SET_REFETCH:
        return { ...state, shouldRefetch: true };
    case RESET_REFETCH:
        return { ...state, shouldRefetch: false };
    default:
      return state;
  }
};

export default reducer
