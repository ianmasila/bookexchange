import express from 'express';
const router = express.Router();

/*
** TODO: Authentication & Authorisation
** Use for protected routes once session is implemented so that user privacy and security is enforced
*/

import TestRoutes from './test';
import AuthRoutes from './auth';
import UserRoutes from './user';
import BookRoutes from './book';
import BidRoutes from './bid';

router.use('/test', TestRoutes);
router.use('/auth', AuthRoutes);
router.use('/user', UserRoutes);
router.use('/book', BookRoutes);
router.use('/bid', BidRoutes);

export default router;
