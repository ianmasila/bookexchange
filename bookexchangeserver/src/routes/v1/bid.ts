import express from 'express';
const BidRoutes = express.Router();
import BidController from '../../controllers/bid';

BidRoutes.get('/list', BidController.getBidForBook);
BidRoutes.post('/create', BidController.createBidForBook);
BidRoutes.post('/update', BidController.updateBidForBook);
BidRoutes.post('/answer', BidController.answerBidForBook);
BidRoutes.post('/delete', BidController.deleteBidForBook);

export default BidRoutes;
