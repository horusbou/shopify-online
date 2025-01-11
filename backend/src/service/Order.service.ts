import db from "../database";
import { Cart, User } from "../entity";
export type OrderStatus = "active" | "inactive" | "under_review" | "accepted";

export class OrderService{
    static async getOrdersByType(type: OrderStatus) {
        let carts = await db.carts.find({where:{status:type},relations:["cartProducts", "cartProducts.product","user"]})
      return carts
    }
    static async cartToOrder(user:User):Promise<Cart>{
        let cart =  await db.carts.findOne({where:{user:{id:user.id},status:'active'}}) 
        if (!cart) {
            throw new Error("No active cart found for the user.");
        }
        cart.status = "under_review"
        return await db.carts.save(cart)
    }

    static async deleteCartUnderReview(user:User,order_id:string):Promise<Cart>{
        let cart =  await db.carts.findOne({where:{user:{id:user.id},status:'under_review',id:order_id}}) 
        if (!cart) {
            throw new Error("No active cart found for the user.");
        }
        cart.status = "inactive"
        return await db.carts.save(cart)
    }
}