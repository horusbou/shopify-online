import { OrderController } from "../controller/order.controller";
import requiresUser from "../middleware/requiresUser.middleware";

const express = require('express');

const orderRoutes = express.Router();

orderRoutes.get(
    '/orders/:type',
    requiresUser,
    OrderController.getAllOrders
  );
orderRoutes.get(
    '/orders/:user_id/:type',
    requiresUser,
    OrderController.getAllOrdersForUser
  );
orderRoutes.get(
  '/orders',
  requiresUser,
  OrderController.cartToOrder
);

orderRoutes.delete(
  '/orders/:order_id',
  requiresUser,
  OrderController.deleteOrder
);

orderRoutes.post(
  '/orders/:order_id',
  requiresUser,
  OrderController.validateOrder
);
export default orderRoutes;
