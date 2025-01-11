import axios from "axios";
import { CreatedSession, Order, Product, SignUpUser, UserLogin } from "../types";
import { UserType } from "../types";
import { Cart, CartItem } from "../types/Cart";

const API_BASE_URL = "http://localhost:3000"; 

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000, // Optional: set a timeout
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true
});

/*api.interceptors.response.use(
  (response) => response.data, // Automatically unwrap response data
  (error) => {
    console.error(error); // Log the error
    return Promise.reject(error); // Re-throw for error handling
  }
);

api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error(error); // Log the error
    const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";

    return Promise.reject(errorMessage);
  }
);*/

let interceptorSet = false;

export const setupInterceptors = (setErrorMessage: (message: string | null) => void) => {
  if (interceptorSet) return;

  api.interceptors.response.use(
    (response) => {
      return response.data; 
    },
    (error) => {
      console.error("Axios Error:", error);

      const errorMessage = error?.response?.data?.message || "An unexpected error occurred.";
      setErrorMessage(errorMessage);

      return Promise.reject(error);
    }
  );

  interceptorSet = true; // Mark the interceptor as registered
};



export const deleteProduct = (product_id:string)=>{
  return api.post("/products/"+product_id)

}

export const getProducts = (): Promise<Product[]> => {
    return api.get("/products");
};
export const getProduct =<T>(productId:string):Promise<Product> =>{
  return api.get("/products/"+productId)
}
export const signUp = <T>(data:SignUpUser):Promise<T>=>{
  return api.post<T>("/users",data)
}

export const login=(userData:UserLogin):Promise<CreatedSession>=>{
  return api.post("/sessions",userData)
}

export const updateUser = (userData:Partial<UserType>):Promise<UserType>=>{
  return api.post("/users/update", userData)
}

export const apiAddToCart = (product_id:string,quantity:number):Promise<CartItem>=>{
  return api.post("/cart",{product_id,quantity})
}

export const apiGetUserCart = ():Promise<Cart[]>=>{
  return api.get("/cart")
}

export const removeItemInCart = (product_id:string):Promise<Cart[]>=>{
  return api.delete("/cart",{data:{product_id}})
}
export const getUserActiveOrders = (userId?:string):Promise<Cart[]> =>{
  if(userId)
    return api.get("/orders/"+userId+"/active")
  return api.get("/orders/active")
}
export const getUserInctiveOrders = (userId?:string):Promise<Cart[]> =>{
  if(userId)
    return api.get("/orders/"+userId+"/inactive")
  return api.get("/orders/inactive")
}
export const getUserUnderReviewOrders = (userId?:string):Promise<Cart[]> =>{
  if(userId)
    return api.get("/orders/"+userId+"/under_review")
  return api.get("/orders/under_review")
}

export const cartToOrder = ():Promise<Order>=>{
  return api.get("/orders")
}
export const validateAnOrder = (order_id:string):Promise<Order>=>{
  return api.post("/orders/"+order_id)
}
export const deleteAnOrder = (order_id:string):Promise<Order>=>{
  return api.delete("/orders/"+order_id)
}

export const getSellers = ():Promise<UserType[]>=>{
  return api.get("/users/sellers")
}

export const getSeller = (user_id:string):Promise<UserType>=>{
  return api.get("/users/sellers/"+user_id)
}
export const disableSeller = (user_id:string):Promise<UserType>=>{
  return api.delete("/users/sellers/"+user_id)
}
export const activateSeller = (user_id:string):Promise<UserType>=>{
  return api.post("/users/sellers/"+user_id)
}

export const addProducts = (formData:FormData)=>{
  return api.post("/products",formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const updateProduct = (product_id:string,productData:Partial<Product>)=>{
  return api.post("/products/"+product_id,productData)
}
export default api;
