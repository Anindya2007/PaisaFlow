import express from 'express';
import checkAuth from '../middleware/auth_middleware.js';
import {createTransaction,getAllTransactions,getTransactionById,updateTransaction,deleteTransaction} from '../controllers/transaction.js'

const transactionRouter=express.Router();

transactionRouter.use(checkAuth);

transactionRouter.post('/',createTransaction)
transactionRouter.get('/',getAllTransactions)
transactionRouter.get('/:id',getTransactionById)
transactionRouter.patch('/:id',updateTransaction)
transactionRouter.delete('/:id',deleteTransaction)

export default transactionRouter;