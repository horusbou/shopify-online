import db from "../database";
import { Product, User } from "../entity";
import { DeleteResult } from "typeorm";
import HttpException from "../lib/HttpException";
import { omit } from "lodash";

export class ProductService {
  static async updateProduct(product_id: string,productData:Partial<Product>) {
    const product = await db.products.findOne({ where: { id:product_id } });
    if (!product) {
      throw new HttpException(400,'Product not found');
    }
    const categories = (
      await Promise.all((productData.categories ?? []).map(async (cat) => db.categories.findBy({ id: cat.id })))
    ).flat();
    
    Object.assign(product, omit(productData,"categories"));
    categories.map(async (cat)=>{
      const category  = await db.categories.findOne({where:{id:cat.id},relations:["products"]})
      if(category){
        category?.products.push(product)
        await db.categories.save(category)
      }
    })
    await db.products.save(product);  
  }
  static async getProductsByVendor(vendor_id: string):Promise<Product[]> {
    const products = await db.products.find({ where: { vendor: { id: vendor_id } } });
    return products;
  }
  static async deleteProduct(product_id: string):Promise<DeleteResult> {
    const product = await db.products.findOne({where:{id:product_id},relations:["cartProducts"]})
    if(product && product?.cartProducts.length>0)
      throw new HttpException(400,"you cannot remove this product")
    return db.products.delete({id:product_id})
  }
  static getAllProduct(): Promise<Product[]> {
    return db.products.find({relations:['categories']})
  }
  static getProduct(product_id: string): Promise<Product | null> {
    return db.products.findOne({where:{ id: product_id },relations:["categories"]})
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
