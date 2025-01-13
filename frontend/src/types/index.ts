export interface SignUpUser{
    email:string;
    password:string;
    username:string;
    name:string;
}
export interface CreatedSession{
    accessToken:string;
    refreshToken:string;
}

export interface UserLogin{
    email:string;
    password:string;
}


export interface Product {
    id: string;
    name: string;
    image: string;
    price: number;
    amount: number;
    salePercent?:number;
    isOnSale?: boolean;
    description:string;
    categories?:Category[]
  }
export interface Category{
  id:string;
  name:string;
  products?:Product[]
}
  export interface CartProduct {
    id: string;
    product: Product;
    quantity: number;
  }

  export interface Cart {
    id: string;
    user: UserType;
    status: "active" | "inactive" | "under_review" | "accepted";
    cartProducts: CartProduct[];
  }
  
  export interface UserType{
    id: string; 
    username: string;
    name: string;
    email: string;
    address: string;
    city:string;
    country: string;
    postalCode:string;
    role: "customer" | "admin" | "vendor";
    session: string; 
    carts: Cart[];
    products: Product[];
    isActive:boolean;
  };
  