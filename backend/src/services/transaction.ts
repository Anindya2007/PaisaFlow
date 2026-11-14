import prisma from '../config/db.js';
import { TransactionType } from '../generated/prisma/client.js';

// ==========================Create new transaction ==================================
export const newTransaction = async (
    userId: string,
    fromAccountId: string,
    categoryId: string,
    type: TransactionType,
    amount: number,
    description: string,
    toAccountId?: string // optional destination account for transfers
) => {
    try {
        // Verify source account belongs to user
        const sourceAccount = await prisma.account.findUnique({
            where: { id: fromAccountId, userId },
        });
        if (!sourceAccount) {
            return null;
        }

        // Expense balance check on source account
        if (type === TransactionType.EXPENSE && Number(sourceAccount.balance) < amount) {
            throw new Error("Insufficient Balance");
        }

        // Perform atomic updates and transaction record creation
        return await prisma.$transaction(async (tx) => {
            // Update source account balance
            await tx.account.update({
                where: { id: fromAccountId },
                data: {
                    balance:
                        type === TransactionType.INCOME
                            ? { increment: amount }
                            : { decrement: amount },
                },
            });
            
            // If a destination account is provided, credit it (transfer scenario)
            if (toAccountId) {
                // Ensure destination account exists (optional safety check)
                const dest = await tx.account.findUnique({ where: { id: toAccountId } });
                if (dest) {
                    await tx.account.update({
                        where: { id: toAccountId },
                        data: { balance: { increment: amount } },
                    });
                }
            }

            // Create transaction record (stores only the primary account)
            const newTrans = await tx.transaction.create({
                data: {
                    userId,
                    accountId: fromAccountId,
                    categoryId,
                    type,
                    amount,
                    description,
                    transactionDate: new Date(),
                },
            });

            return { success: true, message: "transaction created", transaction: newTrans };
        });
    } catch (err: any) {
        throw new Error(err.message);
    }
};

// ==========================Get all transactions ==================================
export const allTransactions = async (userId: string) => {
    try {
        const transactions = await prisma.transaction.findMany({
            where: { userId },
            select: {
                amount: true,
                transactionDate: true,
                type: true,
                category: { select: { name: true } },
                account: { select: { accountName: true } },
            },
        });
        if (!transactions) {
            return null;
        }
        return transactions;
    } catch (err: any) {
        throw new Error(err.message);
    }
};

// ==========================GET Transaction by id ==================================
export const transactionById = async (id: string) => {
    try {
        const transaction = await prisma.transaction.findUnique({
            where: { id },
            select: {
                amount: true,
                transactionDate: true,
                type: true,
                category: { select: { name: true } },
                account: { select: { accountName: true } },
            },
        });
        if (!transaction) {
            return null;
        }
        return transaction;
    } catch (err: any) {
        throw new Error(err.message);
    }
};