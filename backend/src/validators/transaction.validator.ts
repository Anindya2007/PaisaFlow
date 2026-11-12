import {z} from 'zod';

export const transactionSchema=z.object({
    accountId:z.string().uuid().min(1,"Account Id is required"),
    categoryId:z.string().uuid().min(1,"Category Id is required"),
    type:z.enum(["INCOME","EXPENSE"]),
    amount:z.number().min(1,"Amount is required"),
    description:z.string().optional()
});