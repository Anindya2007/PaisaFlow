import express from 'express';
import checkAuth from '../middleware/auth_middleware.js';
import {createAccount,getAllAccounts,getAccountsById,updateAccount, getAccountBalance, deleteAccount} from '../controllers/account.js'

const router=express.Router();

router.use(checkAuth);

router.post('/',createAccount); //Router for creating an bank account

router.get( '/',getAllAccounts);    //Router for getting all bank account

router.get('/all',getAccountsById); //Router for fetching all accounts of a particular user
router.get('/:id/balance',getAccountBalance) ; //Router for getting balance of a particular account

router.patch('/:id/edit',updateAccount); //Router for updating an account by id

router.delete('/:id/delete',deleteAccount); //Router for deleting an account by id

export default router;