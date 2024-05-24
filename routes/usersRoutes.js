import usersController from "../controllers/usersController.js";
//import booksController from "../controllers/booksController.js";

import express from 'express';

const router = express.Router();

router.get('/', usersController.getAllUsers);
router.get('/:id', usersController.getUserById)

export default router;