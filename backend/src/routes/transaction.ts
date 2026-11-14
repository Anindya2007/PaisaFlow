import express from 'express';
import checkAuth from '../middleware/auth_middleware.js';
import {createTransaction,getAllTransactions,getTransactionById} from '../controllers/transaction.js'

const transactionRouter=express.Router();

transactionRouter.use(checkAuth);

transactionRouter.post('/create',createTransaction)
transactionRouter.get('/all',getAllTransactions)
transactionRouter.get('/search/:id',getTransactionById)


export default transactionRouter;