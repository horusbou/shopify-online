import db from "../database";
import { Category } from "../entity/Category";
import HttpException from "../lib/HttpException";


export class CategoryService{
    static async deleteProductInCategory(categoryId: string, product_id: string) {
        const category = await db.categories.findOne({
          where: { id: categoryId },
          relations: ["products"],
        });
      
        if (!category) {
          throw new Error("Category not found");
        }
      
        const productIndex = category.products.findIndex((product) => product.id === product_id);
        if (productIndex === -1) {
          throw new Error("Product not found in this category");
        }
      
        category.products = category.products.filter((product) => product.id !== product_id);
      
        return await db.categories.save(category);
      
      }
      
    static async getAllCategories():Promise<Category[]>{
        return await db.categories.find();
    }

    static async addNewCategory(name:string):Promise<Category>{
        const category=new Category();
        category.name = name;
        return await db.categories.save(category);
    }
    static async updateCategory(category_id:string, name:string):Promise<Category>{
        const category=await db.categories.findOne({where:{id:category_id}})
        if(!category)
            throw new HttpException(400,"something went wrong")
        category.name = name
        return db.categories.save(category);
    }
    static async deleteCategory(category_id:string){
        const category=await db.categories.findOne({where:{id:category_id},relations:["products"]})
        if(!category)
            throw new HttpException(400,"something went wrong")
        if(category.products.length>0)
            throw new HttpException(400,"you need to remove products unders this category");
        else
            return db.categories.remove(category);
    }
    
    static async getProductsFromCategry(categoryId:string){
            const category = await db.categories.findOne({
              where: { id: categoryId },
              relations: ["products"],
            });
            if (!category) {
              throw new HttpException(400,"something went wrong")
            }
            return category.products
    }
}