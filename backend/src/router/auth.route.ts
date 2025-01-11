import { UserController } from "../controller/user.controller";
import requiresUser from "../middleware/requiresUser.middleware";
import { AuthService } from "../service/auth.service";

const express = require('express');

const authRoutes = express.Router();

authRoutes.post(
  '/users',
  AuthService.createUserhandler
);
authRoutes.post(
  '/users/update',requiresUser,
  UserController.updateUser
);

authRoutes.get("/sessions", requiresUser, AuthService.getUserSessionsHandler)
authRoutes.post("/sessions", AuthService.createUserSessionhandler)
authRoutes.delete('/sessions', requiresUser, AuthService.invalidateUserSessionHandler);



export default authRoutes
