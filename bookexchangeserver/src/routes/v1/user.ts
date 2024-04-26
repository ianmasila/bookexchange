import express from 'express';
const UserRoutes = express.Router();
import UserController from '../../controllers/user';

UserRoutes.get('/list', UserController.getAllUsersHandler);
UserRoutes.get('/', UserController.getUserByIdOrUsernameHandler);

export default UserRoutes;
