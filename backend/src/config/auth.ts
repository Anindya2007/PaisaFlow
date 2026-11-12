import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";

export const auth = betterAuth({
  appName: "PaisaFlow",

  baseURL: "http://localhost:3000",

  trustedOrigins: [
    "http://localhost:3000",
  ],
  
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  user: {
    modelName: "User",
  },
  account: {
    modelName: "AuthAccount",
  },
  session: {
    modelName: "Session",
    cookieCache:{
      enabled:true,
      strategy:'compact',
      maxAge:5*60
    }
  },
  verification: {
    modelName: "Verification",
  },
  databaseHooks: {
    account: {
      create: {
        after: async (account) => {
          if (account.password && account.userId) {
            await prisma.user.update({
              where: { id: account.userId },
              data: { passwordHash: account.password },
            });
          }
        },
      },
      update: {
        after: async (account) => {
          if (account.password && account.userId) {
            await prisma.user.update({
              where: { id: account.userId },
              data: { passwordHash: account.password },
            });
          }
        },
      },
    },
  },
  emailAndPassword: {
    enabled: true,
  },
});

export default auth;
