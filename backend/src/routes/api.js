import express from 'express';
import { search } from '../controllers/searchController.js';
import { getDashboardData } from '../controllers/dashboardController.js';
import { exportCSV } from '../controllers/exportController.js';

const router = express.Router();

router.post('/search', search);
router.get('/dashboard-data', getDashboardData);
router.get('/export-csv', exportCSV);

export default router;