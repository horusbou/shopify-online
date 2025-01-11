import { NextFunction, Request, Response } from "express";
import { CartService } from "../service/cart.service";
import { OrderService } from "../service/Order.service";

export class CartController{
    static async removeProductInCart(req:Request,res:Response) {
        const {product_id} = req.body
        console.log("remove=>",product_id)
        //@ts-ignore
        let user = req.user;
        if(!user)
            return res.status(404).json({message:"something went wrong"})
        try {
            let cart = await CartService.removeProductInCart(user,product_id)

            res.json(cart)
        } catch (error) {
            res.status(500).json({ message: "An error occurred while removing the product from the cart." });
        }

    }
    static async getActiveUserCart(req:Request,res:Response){
        //@ts-ignore
        let user = req.user;
        if(!user)
            return res.status(404).json({message:"something went wrong"})
        let cart = await CartService.getActiveUserCart(user)
        if(!cart?.cartProducts)
            return res.json([])
        return res.json(cart?.cartProducts)
    }

    static async getUserCarts(req:Request, res:Response ){
        //@ts-ignore
        let user = req.user;
        if(!user)
            return res.status(404).json({message:"something went wrong"})
        let cart = await CartService.getUserCarts(user)
        res.json(cart)
    }

    static async addProductToCart(req:Request,res:Response,next:NextFunction){
        try {
            const {product_id,quantity} = req.body
            //@ts-ignore
            let user = req.user
            if(!user)
                return res.status(404).json({message:"something went wrong"})
            let cart = await CartService.addProductToCart(user,product_id,parseInt(quantity))
            return res.json(cart)
        } catch (error) {
            next(error)
        }

    }

}