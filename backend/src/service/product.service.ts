import db from "../database";
import { Product, User } from "../entity";
import { DeleteResult } from "typeorm";
import HttpException from "../lib/HttpException";

export class ProductService {
  static async updateProduct(product_id: string,productData:Partial<Product>) {
    const product = await db.products.findOne({ where: { id:product_id } });
    if (!product) {
      throw new HttpException(400,'Product not found');
    }
  
    Object.assign(product, productData);
    
    await db.products.save(product);  
  }
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
