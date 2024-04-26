import express from 'express';
const AuthRoutes = express.Router();
import AuthController from '../../controllers/auth';
import { isLoggedInMiddleware } from '../../middleware/auth';
import { isAdministratorMiddleware } from '../../middleware/auth';

AuthRoutes.post('/login', AuthController.login);
AuthRoutes.post('/register', AuthController.register);

export default AuthRoutes;
