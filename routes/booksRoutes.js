import booksController from '../controllers/booksController.js';
import finesController from '../controllers/finesController.js';
import ROLES_LIST from '../config/rolesList.js'

import express from 'express';

const router = express.Router();

router.route('/')
    .get(booksController.getAllBooks)
    .post(/*ROLES_LIST.Admin,*/ booksController.addNewBook)

    
router.route('/:id')
    .get(booksController.getBookbyId)
    .put(/*ROLES_LIST.Admin,*/ booksController.editBookData)
    .delete(/*ROLES_LIST.Admin,*/ booksController.deleteBook)

router.route('/borrow/:id')
    .post(booksController.borrowBook)

router.route('/return/:id')
    .post(booksController.returnBook)


export default router;