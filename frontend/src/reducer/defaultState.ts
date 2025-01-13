import { Product } from "../types";
import { UserType } from "../types";

export interface State {
    cart: Product[];
    amount: number;
    totalCost: number;
    totalCartSize: number;
    showSidebar: boolean;
    showLogin: boolean;
    screenWidth: number;
    showingOverlay: boolean;
    showingCart: boolean;
    products:Product[];
    user:UserType|null;
    shouldRefetch:boolean
  }

  export const defaultState: State = {
    cart: [],
    amount: 0,
    totalCost: 0,
    totalCartSize: 0,
    showSidebar: false,
    showLogin:false,
    screenWidth: window.innerWidth,
    showingOverlay: false,
    showingCart: false,
    products:[],
    user:null,
    shouldRefetch:false
  };