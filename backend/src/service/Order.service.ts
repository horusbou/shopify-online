import { DeleteResult } from "typeorm";
import db from "../database";
import { Cart, User } from "../entity";
import { ProductService } from "./product.service";
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

    static async deleteCartUnderReview(user:User,order_id:string):Promise<DeleteResult>{
        let cart =  await db.carts.findOne({where:{user:{id:user.id},status:'under_review',id:order_id}}) 
        if (!cart) {
            throw new Error("No active cart found for the user.");
        }
        cart.status = "inactive"
        return await db.carts.delete({id:order_id})
    }

    static async validateCartUnderReview(user:User,order_id:string):Promise<Cart>{
        let cart =  await db.carts.findOne({where:{user:{id:user.id},status:'under_review',id:order_id},relations:["cartProducts", "cartProducts.product"]}) 
        if (!cart) {
            throw new Error("No active cart found for the user.");
        }
        cart.status = "accepted"
        cart.cartProducts.map(async (cp)=>{
            let product = await ProductService.getProduct(cp.product.id)
            if(product){
                product.amount-=cp.quantity;
                await db.products.save(product)
            }
        })
        return await db.carts.save(cart)
    }
}