import express from 'express';
import checkAuth from '../middleware/auth_middleware.js';
import {getMonthlyData} from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/monthly', checkAuth, getMonthlyData);

export default router;