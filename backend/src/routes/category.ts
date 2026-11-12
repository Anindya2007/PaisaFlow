import express from 'express';
import checkAuth from '../middleware/auth_middleware.js';
import { getAllCategories,createCategory,updateCategory } from '../controllers/category.js';

const categoryRouter = express.Router();

categoryRouter.use(checkAuth);

categoryRouter.get('/all',getAllCategories);
categoryRouter.post('/create',createCategory);
categoryRouter.patch('/update/:name',updateCategory);



export default categoryRouter;