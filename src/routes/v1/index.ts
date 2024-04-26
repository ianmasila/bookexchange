import express from 'express';
const router = express.Router();

// TODO: Use for protected routes
// import { isLoggedInMiddleware } from '../../middleware/auth';

import AuthRoutes from './auth';

router.use('/auth', AuthRoutes);

export default router;
