import { Request, Response } from 'express';
import { newTransaction, allTransactions, transactionById} from '../services/transaction.js';
import { transactionSchema } from '../validators/transaction.validator.js';



// ========================== Create transaction by id ==================================
export const createTransaction = async (req: Request, res: Response) => {
    try {
        if (!req.authUser) { // Checking for the authentication again
            return res.status(401).json({ message: "Unauthorized" })
        };
        const check = transactionSchema.safeParse(req.body);

        if (!check.success){ //Checking wether the inputs are valid or not
            return res.status(401).json({message:"Inputs with wrong data type entered!!"})
        };

        const userId = req.authUser.id; //Fetching user id from the authUser
        const { accountId,categoryId,type ,amount ,description } = check.data; //Destructuring
        
        const transaction = await newTransaction(userId,accountId,categoryId,type ,amount ,description as string);

        if (!transaction){ //Checking wether the transaction is created or not
            return res.status(401).json({message:"Transaction Failed!!"})
        }

        return res.status(201).json({message:"Transaction successfull!!",transaction});
    }
    catch (err: any) {
        return res.status(400).json({ message: err.message });
    }
};



// ========================== Get all transactions ==================================
export const getAllTransactions = async (req: Request, res: Response) => {
    try{
        if (!req.authUser){
            return res.status(401).json({mesage:"Unauthorized!!"});
        };

        const userId = req.authUser.id; //Fetching userId from the authUser
        
        const Transactions = await allTransactions(userId); //Fetching all transactions

        if (!Transactions){
            return res.status(201).json({message:"No transactions was made by you!!"});
        };

        return res.status(201).json({message:"Transactions fetched sucessfully",success:true,Transactions});
    }
    catch (err){
        return res.status(402).json({message:"Something went wrong!!"});
    };
};


// ========================== Get transaction by id ==================================
export const getTransactionById = async (req: Request, res: Response) => {
    if (!req.authUser){
        return res.status(401).json({message:"Unauthorized!!"});
    };

    const id=req.params?.id;
    
    if (!id){
        return res.status(401).json({message:"ID not provided!!",success:false});
    };
    
    const transactions= await transactionById(id as string);
    
    if (!transactions){
        return res.status(401).json({message:"Transaction not found!!",success:false});
    };
    
    return res.status(201).json({message:"Transaction fetched sucessfully",success:true,transactions});
};


// ========================== Update transaction by id ==================================
export const updateTransaction = async (req: Request, res: Response) => {
    if (!req.authUser){
        return res.status(401).json({message:"Unauthorized!!"});
    };
    
    const id=req.params?.id;
    
    if (!id || !req.body){
        return res.status(401).json({message:"ID not provided or Inputs not provided!!",success:false});
    };

    

};



// ========================== Delete transaction by id ==================================
export const deleteTransaction = async (req: Request, res: Response) => {

};