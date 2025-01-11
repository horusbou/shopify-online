import { Request, Response } from "express"
import { ProductService } from "../service/product.service"
import { Product, User } from "../entity"

export class ProductController {
  static async deleteProduct(req:Request,res:Response) {
    let {product_id} = req.params
    let deleteResult = await ProductService.deleteProduct(product_id)
    if(!deleteResult.affected)
      return res.status(404).json({ message: "Something went wrong" });
    return res.json(deleteResult)
  }
    static async createProduct(req:Request,res:Response) {
      let {name,price, stock: amount, description} = req.body
      const imageUrl = req.file ? `/uploads/${req.file.filename}` : "";
      console.log("Request Body:", req.body); // Add this
      console.log("Name:", name, "Price:", price, "Amount:", amount);
      //@ts-ignore
      let vendor = req.user
      if(!vendor)
        return res.sendStatus(300)

      let product = await ProductService.createProduct({
        name,
        description,
        image:imageUrl,
        price,
        amount
      },vendor)
      res.json(product)
    }

  static async getAllProduct(req: Request, res: Response) {
      let products = await ProductService.getAllProduct()
      return res.json(products)
  }

 static async getProduct(req:Request,res:Response){
  let {product_id} = req.params
  let product = await ProductService.getProduct(product_id)
  return res.json(product)
 } 
 static async getProductOfVendor(req:Request,res:Response){
  try {
    const { vendor_id } = req.params; 
    //@ts-ignore
    const user = req.user as User; 

    if (user.role === "admin") {
      if (!vendor_id) {
        return res.status(400).json({ message: "Vendor ID is required for admin" });
      }

      const products = await ProductService.getProductsByVendor(vendor_id);

      if (!products.length) {
        return res.status(404).json({ message: "No products found for this vendor" });
      }

      return res.json(products);
    }

    if (user.role === "vendor") {
      const products = await ProductService.getProductsByVendor(user.id);

      if (!products.length) {
        return res.status(404).json({ message: "No products found for your account" });
      }

      return res.json(products);
    }

    return res.status(403).json({ message: "Access denied" });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({ message: "Internal server error" });
  }

 }
}
