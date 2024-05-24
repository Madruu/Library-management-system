import registerController from '../controllers/registerController.js';
import express from 'express';

const router = express.Router();


router.post('/', registerController.handleNewUser);

export default router;