import { CartController } from "../controller/cart.controller";
import requiresUser from "../middleware/requiresUser.middleware";

const express = require('express');

const cartRoutes = express.Router();

cartRoutes.get(
  '/carts',
  requiresUser,
  CartController.getUserCarts
);

cartRoutes.get(
  '/cart',
  requiresUser,
  CartController.getActiveUserCart
);

cartRoutes.post(
    "/cart",requiresUser,
    CartController.addProductToCart
)
cartRoutes.delete(
    "/cart",
    requiresUser,
    CartController.removeProductInCart
)

export default cartRoutes;
