import express from 'express';
import AccountRouter from './accounts.js';


const universalRouter=express.Router();

universalRouter.use('/account',AccountRouter);


export default universalRouter;