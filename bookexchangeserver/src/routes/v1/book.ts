import express from 'express';
const BookRoutes = express.Router();
import BookController from '../../controllers/book';
import { isLoggedInMiddleware } from '../../middleware/auth';

BookRoutes.get('/author', BookController.getBooksByAuthorHandler);
BookRoutes.get('/genre', BookController.getBooksByGenreHandler);
BookRoutes.get('/owner', BookController.getBooksByOwnerHandler);
BookRoutes.get('/create', BookController.createBookHandler);
BookRoutes.get('/update', BookController.updateBookHandler);
BookRoutes.get('/', BookController.getBookByTitleHandler);


export default BookRoutes;
