import express from 'express';
const router = express.Router();

// TODO: Use for protected routes
// import { isLoggedInMiddleware } from '../../middleware/auth';

import TestRoutes from './test';
import AuthRoutes from './auth';
import UserRoutes from './user';

router.use('/test', TestRoutes);
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);

export default router;
