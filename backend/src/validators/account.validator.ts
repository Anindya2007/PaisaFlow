import {z} from 'zod';
import { AccountType } from '../generated/prisma/enums.js';

export const AccountSchema=z.object({
    name:z.string().min(3,'name cannot be smaller than 3 characters'),
    type:z.nativeEnum(AccountType),
    balance: z.string().regex(/^\d+(\.\d{1,2})?$/).transform(val=>Number(val))
})

export type AccountSchemaType=z.infer<typeof AccountSchema>