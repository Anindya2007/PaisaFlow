import express from 'express';
import AccountRouter from './accounts.js';
import categoryRouter from './category.js';
import transactionRoute from './transaction.js'


const universalRouter=express.Router();

universalRouter.use('/account',AccountRouter);
universalRouter.use('/category',categoryRouter);
universalRouter.use('/transaction',transactionRoute)


export default universalRouter;