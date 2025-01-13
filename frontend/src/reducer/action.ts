import { Product } from "../types";
import { UserType } from "../types";
export const SHOW_SIDEBAR = "SHOW_SIDEBAR";
export const HIDE_SIDEBAR = "HIDE_SIDEBAR";
export const SHOW_OVERLAY = "SHOW_OVERLAY";
export const HIDE_OVERLAY = "HIDE_OVERLAY";
export const SHOW_CART = "SHOW_CART";
export const HIDE_CART = "HIDE_CART";
export const HIDE_LOGIN = "HIDE_LOGIN";
export const SHOW_LOGIN = "SHOW_LOGIN";
export const READ_SCREENWIDTH = "READ_SCREENWIDTH";
export const INCREASE_AMOUNT = "INCREASE_AMOUNT";
export const DECREASE_AMOUNT = "DECREASE_AMOUNT";
export const ADD_TO_CART = "ADD_TO_CART";
export const UPDATE_CART = "UPDATE_CART";
export const GET_TOTAL_CART = "GET_TOTAL_CART";
export const REMOVE_ITEM = "REMOVE_ITEM";
export const SET_PRODUCTS = "SET_PRODUCTS"
export const LOGIN = "LOGIN"
export const LOGOUT = "LOGOUT"
export const GET_CART = "GET_CART"
export const SET_REFETCH = "SET_REFETCH";
export const RESET_REFETCH = "RESET_REFETCH";

export type ActionType =
  | { type: typeof SHOW_SIDEBAR }
  | { type: typeof HIDE_SIDEBAR }
  | { type: typeof SHOW_OVERLAY }
  | { type: typeof HIDE_OVERLAY }
  | { type: typeof SHOW_CART }
  | { type: typeof HIDE_CART }
  | { type: typeof SHOW_LOGIN }
  | { type: typeof HIDE_LOGIN }
  | { type: typeof INCREASE_AMOUNT; payload: { id: string, limit:number } }
  | { type: typeof DECREASE_AMOUNT; payload: { id: string } }
  | { type: typeof ADD_TO_CART; payload: { productId: string; amount: number } }
  | { type: typeof UPDATE_CART }
  | { type: typeof GET_TOTAL_CART }
  | { type: typeof REMOVE_ITEM; payload: { id: string } }
  | { type: typeof READ_SCREENWIDTH; payload: number }
  | { type: typeof SET_PRODUCTS; payload: Product[] }
  | { type: typeof LOGIN; payload: UserType }
  | { type: typeof LOGOUT }
  | { type: typeof GET_CART; payload: Product[]}
  | { type: typeof SET_REFETCH }
  | { type: typeof RESET_REFETCH }