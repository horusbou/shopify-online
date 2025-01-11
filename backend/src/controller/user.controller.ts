import { NextFunction, Request, Response } from "express";
import HttpException from "../lib/HttpException";
import { UserService } from "../service/user.service";
import { omit } from "lodash";
import { SessionService } from "../service/session.service";
import db from "../database";

export class UserController{
    static async updateUser(req:Request,res:Response,next:NextFunction) {
        //@ts-ignore
        let user = req.user;
        if(!user)
            return next(new HttpException(400,"you need to be logged in"))
        const { name, address, city, postcode, country } = req.body;
        try {
            let updatedUser = (await UserService.updateUser({user,name,address,city,postcode,country}))
            const session = await db.sessions.findOne({where:{ user:{id:user.id}, valid:true }})
            if (!session) {
                return next(new HttpException(404, "Session creation failed"));
              }

            const accessToken = SessionService.createAccessToken({
                user: omit(updatedUser, 'password'),
                session,
              });
              
              res.cookie("accessToken", accessToken, {
                maxAge: 300000,
                httpOnly: true,
              });

            res.json(updatedUser)
        } catch (error) {
            if(error instanceof HttpException)
                next(error)
            else 
                next(new HttpException(400,"something went wrong"))
        }
    }
    static async getSellers(req:Request,res:Response,next:NextFunction){
        try {
            let sellers = (await UserService.getSellers())
            res.json(sellers)
        } catch (error) {
            if(error instanceof HttpException)
                next(new HttpException(400,error.message))
            else 
                next(new HttpException(400,"something went wrong"))
        }
    }

    static async getSeller(req:Request,res:Response,next:NextFunction){
        const { seller_id } = req.params
        try {
            let seller = (await UserService.getSeller(seller_id))
            res.json(seller)
        } catch (error) {
            if(error instanceof HttpException)
                next(new HttpException(400,error.message))
            else 
                next(new HttpException(400,"something went wrong"))
        }
    }
    static async disableSeller(req:Request,res:Response,next:NextFunction){
        const { seller_id } = req.params
        try {
            let seller = (await UserService.disableSeller(seller_id))
            res.json(seller)
        } catch (error) {
            if(error instanceof HttpException)
                next(error)
            else 
                next(new HttpException(400,"something went wrong"))
        }
    }
    static async activateSeller(req:Request,res:Response,next:NextFunction){
        const { seller_id } = req.params
        try {
            let seller = (await UserService.activateSeller(seller_id))
            res.json(seller)
        } catch (error) {
            if(error instanceof HttpException)
                next(new HttpException(400,error.message))
            else 
                next(new HttpException(400,"something went wrong"))
        }
    }
}