import { Request } from "express";
import { ProductController } from "../controller/product.controller";
import requiresUser from "../middleware/requiresUser.middleware";
import multer, { StorageEngine } from "multer";
import path from "path";
import checkRole from "../middleware/checkRole";

const express = require('express');


const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req: Request, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const prodRoutes = express.Router();
const upload = multer({ storage });

prodRoutes.get(
  '/products',
  ProductController.getAllProduct
);
prodRoutes.post("/products", upload.single('image') , requiresUser,checkRole(["admin"]) ,ProductController.createProduct)

prodRoutes.post("/products/:product_id",checkRole(["admin"]),ProductController.updateProduct)
prodRoutes.get("/products/:product_id",ProductController.getProduct)
prodRoutes.delete("/products/:product_id",checkRole(["admin"]),ProductController.deleteProduct)



export default prodRoutes