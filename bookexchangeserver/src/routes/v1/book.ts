import express from 'express';
const BookRoutes = express.Router();
import BookController from '../../controllers/book';

BookRoutes.get('/list', BookController.getAllBooksHandler);
BookRoutes.get('/author', BookController.getBooksByAuthorHandler);
BookRoutes.get('/genre', BookController.getBooksByGenreHandler);
BookRoutes.get('/owner', BookController.getBooksByOwnerHandler);
BookRoutes.get('/', BookController.getBookByTitleHandler);
BookRoutes.post('/create', BookController.createBookHandler);
BookRoutes.post('/update', BookController.updateBookHandler);

export default BookRoutes;
