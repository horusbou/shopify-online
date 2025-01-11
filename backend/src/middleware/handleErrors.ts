import { NextFunction, Request, Response } from "express";
import HttpException from "../lib/HttpException";

export function handleErrors(err: HttpException | Error, _req:Request, res:Response, next:NextFunction){
    if (err instanceof HttpException) {
        res.status(err.status).json({
          message: err.message,
          ...err.additionalInfo,
        });
      } else {
        // Handle other types of errors
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
}