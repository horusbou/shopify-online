import db from "../database";
import { Product, User } from "../entity";
import { DeleteResult } from "typeorm";

export class ProductService {
  static async getProductsByVendor(vendor_id: string):Promise<Product[]> {
    const products = await db.products.find({ where: { vendor: { id: vendor_id } } });
    return products;
  }
  static deleteProduct(product_id: string):Promise<DeleteResult> {
    return db.products.delete({id:product_id})
  }
  static getAllProduct(): Promise<Product[]> {
    return db.products.find()
  }
  static getProduct(product_id: string): Promise<Product | null> {
    return db.products.findOneBy({ id: product_id })
  }
  static getVendorProduct(vendor_id: string): Promise<Product[]> {
    return db.products.findBy({ vendor: { id: vendor_id } })

  }

  //create
  static createProduct(product:Partial<Product>, vendor: User):Promise<Product>{
    console.log({product,vendor})
    const newproduct = db.products.create({
      ...product,
      vendor: {
        id:vendor.id
      }
    })
    return db.products.save(newproduct)
  }
}
