import "reflect-metadata";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import { AppDataSource } from "./database";
import deserializeUser from "./middleware/deserializeUser.middleware";
import cookieParser from "cookie-parser";
import authRoutes from "./router/auth.route";
import prodRoutes from "./router/product.route";
import cartRoutes from "./router/cart.route";
import HttpException from "./lib/HttpException";
import orderRoutes from "./router/order.route";
import userRoutes from "./router/user.route";

import path from "path";
import fs from "fs";
import categoryRoutes from "./router/category.route";

const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
  console.log(`Created directory: ${uploadDir}`);
}

const app = express();
app.use(cors({
  origin: 'http://localhost:3002',
  credentials:true
}))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log(`Incoming Request BODY: ${JSON.stringify(req.body)}`);
  next();
});



app.use(deserializeUser);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(authRoutes)
app.use(prodRoutes)
app.use(cartRoutes)
app.use(orderRoutes)
app.use(userRoutes)
app.use(categoryRoutes)



app.use((err: HttpException | Error, _req:Request, res:Response, _next:NextFunction) => {
  console.log("err=>",err)
  if (err instanceof HttpException) {
    res.status(err.status).json({
      message: err.message,
      ...err.additionalInfo,
    });
  } else {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Database connected successfully!");

    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });

  } catch (err) {
    console.error("Database connection error:", err);
  }
};

main()


