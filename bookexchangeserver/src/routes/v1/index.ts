import express from 'express';
const router = express.Router();

// TODO: Use for protected routes
// import { isLoggedInMiddleware } from '../../middleware/auth';

import TestRoutes from './test';
import AuthRoutes from './auth';
import UserRoutes from './user';
import BookRoutes from './book';

router.use('/test', TestRoutes);
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/book', BookRoutes);

export default router;
