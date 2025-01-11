import { NextFunction, Request, Response } from "express";
import { OrderService, OrderStatus } from "../service/Order.service";
import HttpException from "../lib/HttpException";

export class OrderController{
    static async deleteOrder(req: Request, res: Response, next: NextFunction) {
        const { order_id } = req.params;
        //@ts-ignore
        let user = req.user
        if(!user)
            return next(new HttpException(400, "something went wrong")); 
        try {
            const orders = await OrderService.deleteCartUnderReview(user,order_id);
            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }
    static async getAllOrdersForUser(req: Request, res: Response, next: NextFunction) {
        const { type,user_id } = req.params;
        //@ts-ignore
        let user = req.user
        if(!user)
            return next(new HttpException(400, "something went wrong")); 
        if(user.id != user_id)
            return next(new HttpException(400, "something went wrong")); 
        
        const validStatuses: OrderStatus[] = ["active", "inactive", "under_review", "accepted"];
    
        if (!validStatuses.includes(type as OrderStatus)) {
            return next(new HttpException(400, "Invalid order type: "+ type)); 
        }
    
        try {
            const orders = await OrderService.getOrdersByType(type as OrderStatus);
            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }
    static async getAllOrders(req: Request, res: Response, next: NextFunction) {
        const { type } = req.params;
    
        const validStatuses: OrderStatus[] = ["active", "inactive", "under_review", "accepted"];
    
        if (!validStatuses.includes(type as OrderStatus)) {
            return next(new HttpException(400, "Invalid order type: "+ type)); 
        }
    
        try {
            const orders = await OrderService.getOrdersByType(type as OrderStatus);
            return res.json(orders);
        } catch (error) {
            next(error);
        }
    }
    static async cartToOrder(req:Request,res:Response, next: NextFunction){
        //@ts-ignore
        let user = req.user
        if(!user)
            return next(new HttpException(400, "something went wrong")); 
        let cart = await OrderService.cartToOrder(user)
        return res.json(cart)
    }
}