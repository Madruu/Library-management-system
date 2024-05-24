import finesController from '../controllers/finesController.js';
import express from 'express'

const router = express.Router();

router.route('/')
    .get(finesController.checkFines);

export default router;