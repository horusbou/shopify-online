import db from "../database";
import { Cart, CartProduct, User } from "../entity";
import { ProductService } from "./product.service";

export class CartService{

    static async removeProductInCart(user: User, product_id: string) {
        let cart = await CartService.getActiveUserCart(user);
        console.log("cart",cart,product_id)

        if (!cart) {
            throw new Error("No active cart found for the user.");
        }

        const cartProduct = await db.cartProduct.findOne({
            where: { 
                cart: { id: cart.id }, 
                product: { id: product_id } 
            },
            relations: ["product", "cart"], 
        });
        console.log("here is the issue: ",cartProduct)
        if (!cartProduct) {
           return await CartService.getActiveUserCart(user);
        }
        await db.cartProduct.remove(cartProduct);
        return await CartService.getActiveUserCart(user);
    }

    static async getActiveUserCart(user:User):Promise<Cart|null>{
        return await db.carts.findOne({where:{user:{id:user.id},status:'active'},relations: ["cartProducts", "cartProducts.product"]}) 
     }
    
     private static formatCart(carts:Cart[]){
        return carts.map(cart=>({
                id: cart.id,
                status: cart.status,
                products:cart.cartProducts.map(cp=>cp.product.name)
        }))
     }
    
     static async getUserCarts(user:User){
        let carts = await db.carts
        .createQueryBuilder("cart")
        .leftJoinAndSelect("cart.cartProducts", "cartProducts")
        .leftJoinAndSelect("cartProducts.product", "product")
        .where("cart.userId = :userId", { userId: user.id })
        .andWhere("cart.status IN (:...statuses)", { statuses: ["inactive", "under_review", "accepted"] })
        .getMany();        
        
        if(!carts)
            return null;
        return CartService.formatCart(carts)
    }
    static async createActiveCart(user:User):Promise<Cart>{
        let cart = db.carts.create({user:{id:user.id}})
        return await db.carts.save(cart)
    }
    static async addProductToCart(user: User, product_id: string, quantity: number) {
        let cart = await this.getActiveUserCart(user);
    
        if (!cart) {
          cart = await this.createActiveCart(user);
        }
    
        // Fetch product and validate
        const product = await ProductService.getProduct(product_id);
        if (!product) {
          throw new Error("Product not found.");
        }
    
        if (!cart.cartProducts) {
          cart.cartProducts = [];
      }

        if (quantity > product.amount) {
          throw new Error("Requested quantity exceeds available stock.");
        }
    
        // Check if the product is already in the cart
        let cartProduct = cart.cartProducts.find((cp) => cp.product.id === product_id);
    
        if (cartProduct) {
          // Update quantity if already in cart
          const newQuantity = cartProduct.quantity + quantity;
          if (newQuantity > product.amount) {
            throw new Error("Total quantity exceeds available stock.");
          }
          cartProduct.quantity = newQuantity;
          await db.cartProduct.save(cartProduct);
        } else {
          // Add new product to cart
          cartProduct = db.cartProduct.create({ cart, product, quantity });
          await db.cartProduct.save(cartProduct);
          cart.cartProducts.push(cartProduct);
        }
    
        return this.formatCartProduct(cart);
      }
    
    static formatCartProduct(cart:Cart){
        return {id:cart.id,status:cart.status,cartProduct:cart.cartProducts.map((el)=>({id:el.id,product:el.product,quantity:el.quantity}))}
    }
}