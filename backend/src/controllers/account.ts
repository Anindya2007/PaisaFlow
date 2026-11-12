import {Request,Response,NextFunction} from 'express';
import {NewAccount,AllAccounts,getAccount, updateAccountById, checkBalance, deleteAccountById} from '../services/account.js'
import {AccountSchema} from '../validators/account.validator.js'

// ==========================Create Account ==================================
export const createAccount= async (req:Request,res:Response,next:NextFunction)=>{
    try{
        const check = AccountSchema.safeParse(req.body);
        if (!check.success){
            return res.status(400).json({err:"Invalid request body"});
        }
        
        const {name,type,balance}=check.data;
        
        if (!req.authUser){
            return res.status(401).json({err:"Unauthorized"});
        }
        
        const userId=req.authUser.id;
        
        const account= await NewAccount(userId,name,type,balance);
        
        return res.status(201).json({msg:"Account created successfully",account});
    }
    catch (err){
        return res.status(400).json({err:"Error in creating account"});
    }
};



// ==========================Get all accounts ==================================
export const getAllAccounts= async (req:Request,res:Response,next:NextFunction)=>{
    try {
        if (!req.authUser){
            return res.status(401).json({err:"Unauthorized"});
        }
        
        const data=await AllAccounts();
        
        if (!data){
            return res.status(401).json({message:"No accounts found"})
        }
        
        return res.status(201).json({message:"Data fetched successfully",data})
    }
    catch(err){
        
    }
}



// ========================== Get account by id ==================================
export const getAccountsById = async (req:Request,res:Response)=>{
    try{
        if (!req.authUser){
            return res.status(401).json({message:"Unauthorized"});
        };
        
        const userId=req.authUser.id;
        
        const account= await getAccount(userId);
        
        if (!account){
            return res.status(404).json({message:"No such account found !!"})
        };
        
        return res.status(201).json({message:"Account fetched sucessfully!!",account})
    }
    catch (err){
        return res.status(404).json({message:"Something went wrong",err})
    }
};

// ========================== Get balance by accountId ==================================
export const getAccountBalance = async (req:Request,res:Response)=>{
    try{
        if (!req.authUser){
            return res.status(401).json({message:"Unauthorized!!"});
        };

        const userId = req.authUser.id;
        const accountId = req.params.id as string;
        const {password}=req.body;

        const account = await checkBalance(userId, accountId, password,req.headers as Record<string,string>);

        return res.status(201).json({message:"Account balance fetched successfully",account});
    }
    catch (err){
        return res.status(404).json({message:"Error in fetching balance",err})
    }
    
}


// ========================== Update account by id ==================================
export const updateAccount = async (req:Request,res:Response)=>{
    try{
        if (!req.authUser){
            return res.status(401).json({message:"Unauthorized"});
        };

        const accountId=req.params.id as string;
        const userId=req.authUser.id;
        const {name,type,balance}=req.body;
        
        const account= await updateAccountById(accountId,userId,name,type,balance);
        
        if (!account){
            return res.status(404).json({message:"No such account found !"})
        };

        return res.status(201).json({message:"Account fetched sucessfully!!",account})
    }
    catch (err){
        return res.status(404).json({message:"Something went wrong",err})
    }
}




export const deleteAccount= async (req:Request,res:Response)=>{
    try{
        if (!req.authUser){
            return res.status(401).json({message:"Unauthorized"})
        };

        const accountId = req.params.id as string;
        const userId = req.authUser.id;
        const {password} = req.body;

        const account = await deleteAccountById(userId, accountId, password,req.headers as Record<string,string>);

        if (!account){
            return res.status(404).json({message:"No such account found !!"})
        };

        return res.status(201).json({message:"Account deleted successfully",account})
    }
    
    catch (err){
        return res.status(404).json({message:"Something went wrong",err})
    }
}