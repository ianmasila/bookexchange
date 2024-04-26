import express from 'express';
const BookRoutes = express.Router();
import BookController from '../../controllers/book';
import { isLoggedInMiddleware } from '../../middleware/auth';

BookRoutes.get('/author', BookController.getBooksByAuthorHandler);
BookRoutes.get('/genre', BookController.getBooksByGenreHandler);
BookRoutes.get('/owner', BookController.getBooksByOwnerHandler);
BookRoutes.get('/', BookController.getBookByTitleHandler);

export default BookRoutes;
