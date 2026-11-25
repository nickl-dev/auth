import { db } from "../db";
import { sql } from "drizzle-orm";

export async function checkDatabaseConnection(): Promise<void> {
  await db.execute(sql`SELECT 1`);
}
