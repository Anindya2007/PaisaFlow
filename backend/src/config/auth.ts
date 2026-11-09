import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db.js";

export const auth = betterAuth({
  appName: "Nivora",
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
  },
  verification: {
    modelName: "Verification",
  },
  emailAndPassword: {
    enabled: true,
  },
});

export default auth;
