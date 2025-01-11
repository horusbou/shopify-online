import { UserController } from "../controller/user.controller";
import checkRole from "../middleware/checkRole";
import requiresUser from "../middleware/requiresUser.middleware";

const express = require('express');

const userRoutes = express.Router();

userRoutes.get(
  '/users/sellers',
  requiresUser,
  checkRole(["admin"]),
  UserController.getSellers
);
userRoutes.get(
    '/users/sellers/:seller_id',
    requiresUser,
    checkRole(["admin"]),
    UserController.getSeller
  );

userRoutes.delete(
    '/users/sellers/:seller_id',
    requiresUser,
    checkRole(["admin"]),
    UserController.disableSeller
  );
  userRoutes.post(
    '/users/sellers/:seller_id',
    requiresUser,
    checkRole(["admin"]),
    UserController.activateSeller
  );

export default userRoutes