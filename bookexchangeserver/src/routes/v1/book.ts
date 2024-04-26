import express from 'express';
const BookRoutes = express.Router();
import BookController from '../../controllers/book';
import { isLoggedInMiddleware } from '../../middleware/auth';

BookRoutes.get('/', BookController.getBooksByGenre);

export default BookRoutes;
