import prisma from '../config/db.js';
import { TransactionType } from '../generated/prisma/client.js';

export const newTransaction=async(
    userId:string, accountId:string,
    categoryId:string,type :TransactionType ,
    amount:number ,description:string)=>{
    try{
        const newTransac = await prisma.transaction.create({
            data:{
                userId,
                accountId,
                categoryId,
                type,
                amount,
                description,
                transactionDate:new Date()
            }
        });

        if (!newTransac){
            return null;
        };

        return {success:true,message:"transaction created"}
    }
    catch(err:any){
        throw new Error(err.message)
    }
}

export const allTransactions=async(userId:string)=>{
    try{
        
    }
    catch(err){}
}

export const transactionById=async(id:string)=>{
    try{
        
    }
    catch(err){}
}

export const modifyTransaction=async(id:string,payload:any)=>{
    try{
        
    }
    catch(err){}
}

export const removeTransaction=async(id:string)=>{
    try{
        
    }
    catch(err){}
}