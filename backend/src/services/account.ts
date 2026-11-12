import { Decimal } from '@prisma/client/runtime/client';
import prisma from '../config/db.js';
import { AccountType } from '../generated/prisma/enums.js';
import { auth } from '../config/auth.js';
import { fromNodeHeaders } from 'better-auth/node';

// ==========================Create Account ==================================
export const NewAccount = async (
    userId: string,
    AccountName: string,
    AccountType: AccountType,
    balance: number
) => {
    const create = await prisma.account.create({
        data: {
            userId: userId,
            accountName: AccountName,
            accountType: AccountType,
            balance: new Decimal(balance)
        }
    });

    if (!create) {
        throw Error('Something went wrong while creating account!!')
    };

    return create;
};


// ==========================Get all accounts ==================================
export const AllAccounts = async () => {
    const data = await prisma.account.findMany({
        select: {
            accountName: true,
            accountType: true
        }
    });

    if (!data) {
        return null;
    }
    return data;
};


// ==========================Get accounts by id ==================================
export const getAccount = async (userId: string) => {
    const data = await prisma.account.findMany({
        where: {
            userId: userId
        }
    });

    if (!data) {
        return null;
    };

    return data;

};


export const checkBalance = async (userId: string, accountId: string, password: string,headers:Record<string,string> ) => {
    try { 
        //For verifying wether the password is correct or not
        await auth.api.verifyPassword({
            body:{password},
            headers:fromNodeHeaders(headers)
        });
        //The better auth automatically fetches the userid from sesison cookie and check password from database
        //By doing this it ensure that no one can access other users data

        const account= await prisma.account.findFirst({ //Fetching the account balance
            where:{
                userId:userId,
                id:accountId
            },
            select:{
                accountName:true,
                balance:true
            }
        });

        if (!account){ //If error occur during account fetching
            throw Error("Can't fetch account");
        };

        return account;
    }
    catch (err: any) {
        throw new Error(err.message)
    }

}



// ==========================Update accounts by id ==================================
export const updateAccountById = async (
    accountId: string,
    userId: string,
    accountName: string,
    accountType: AccountType,
    balance: number
) => {
    const update = await prisma.account.update({
        where: {
            id: accountId
        },
        data: {
            accountName: accountName,
            accountType: accountType,
            balance: new Decimal(balance)
        }
    });

    if (!update) {
        throw Error('Something went wrong while updating account!!')
    };

    return update;
};




export const deleteAccountById= async (userId:string,accountId:string,password:string,headers:Record<string,string>)=>{
    try{
        //For verifying wether the password is correct or not
        await auth.api.verifyPassword({
            body:{password},
            headers:fromNodeHeaders(headers)
        });

        const deleteAccount=await prisma.account.delete({
            where:{
                id:accountId,
                userId:userId
            }
        });
        if (!deleteAccount) {
            throw Error("Can't delete account");
        };

        return deleteAccount;
    }
    catch (err:any){
        throw new Error(err.message)
    }
}