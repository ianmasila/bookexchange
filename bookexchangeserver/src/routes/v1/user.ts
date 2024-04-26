import express from 'express';
const UserRoutes = express.Router();
import UserController from '../../controllers/user';
import { isLoggedInMiddleware } from '../../middleware/auth';

UserRoutes.get('/', UserController.getUserByIdOrUsernameHandler);

export default UserRoutes;
