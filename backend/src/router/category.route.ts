import { CategoryController } from "../controller/category.controller";
import requiresUser from "../middleware/requiresUser.middleware";
import checkRole from "../middleware/checkRole"

const express = require('express');

const categoryRoutes = express.Router();

categoryRoutes.get(
  '/categories',
  CategoryController.allCategories
);

categoryRoutes.post(
    "/categories",
    requiresUser,
    checkRole(["admin"]),
    CategoryController.addCategory
)
categoryRoutes.put(
  "/categories/:category_id",
  requiresUser,
  checkRole(["admin"]),
  CategoryController.updateCategory
)
categoryRoutes.delete(
    "/categories/:category_id",
    requiresUser,
    checkRole(["admin"]),
    CategoryController.deleteCategory
)
categoryRoutes.get("/categories/:categoryId/products", CategoryController.getProducts);
categoryRoutes.delete("/categories/:categoryId/products/:product_id", CategoryController.deleteProduct);

export default categoryRoutes;
