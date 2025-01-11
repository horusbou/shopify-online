import { UserController } from "../controller/user.controller";
import requiresUser from "../middleware/requiresUser.middleware";

const express = require('express');

const userRoutes = express.Router();

userRoutes.get(
  '/users/sellers',
  requiresUser,
  UserController.getSellers
);
userRoutes.get(
    '/users/sellers/:seller_id',
    requiresUser,
    UserController.getSeller
  );

userRoutes.delete(
    '/users/sellers/:seller_id',
    requiresUser,
    UserController.disableSeller
  );
  userRoutes.post(
    '/users/sellers/:seller_id',
    requiresUser,
    UserController.activateSeller
  );

export default userRoutes