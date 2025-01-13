import { NextFunction, Request, Response } from "express";
import { CategoryService } from "../service/category.service";

export class CategoryController{
    static async deleteProduct(req:Request,res:Response,next:NextFunction) {
        try {
            const {categoryId,product_id} = req.params
            res.json(await CategoryService.deleteProductInCategory(categoryId,product_id))
        } catch (error) {
            next(error)
        }
   }
    static async allCategories(req:Request,res:Response) {
         res.json(await CategoryService.getAllCategories())
    }

    static async updateCategory(req:Request,res:Response,next:NextFunction) {
        try {
            const {category_id} = req.params
            const {name} = req.body
            res.json(await CategoryService.updateCategory(category_id, name))
        } catch (error) {
            next(error)
        }

   }

    static async addCategory(req:Request,res:Response,next:NextFunction){
        const {name} = req.body
         res.json(await CategoryService.addNewCategory(name))
    }

    static async deleteCategory(req:Request,res:Response,next:NextFunction){
        try {
            const {category_id} = req.params
             res.json(await CategoryService.deleteCategory(category_id))
        } catch (error) {
            next(error)
        }
    }
    static async getProducts(req: Request, res: Response,next:NextFunction){
        const { categoryId } = req.params;
        try {
            res.json(await CategoryService.getProductsFromCategry(categoryId))
        } catch (error) {
            next(error)
        }
      }

}