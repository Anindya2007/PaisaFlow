import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "./src/generated/prisma/client.js";

const connectionString = process.env.DATABASE_URL;

async function main() {
  const adapter = new PrismaPg({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const users = await prisma.user.findMany({ take: 1 });
    console.log("SUCCESS! Found", users.length, "user(s)");
    if (users.length > 0) {
      console.log("First user keys:", Object.keys(users[0]));
    }
  } catch (e: any) {
    console.error("ERROR:", e.message);
    console.error("CODE:", e.code);
    if (e.meta) console.error("META:", JSON.stringify(e.meta));
  } finally {
    await prisma.$disconnect();
    process.exit(0);
  }
}

main();

