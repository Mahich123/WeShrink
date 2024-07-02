import pg from "pg";
import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres";


const pool = new pg.Pool({
  connectionString: process.env.SUPABASE_DB_URL!,
  connectionTimeoutMillis: 10000,
});

const db = drizzle(pool);

export default db;
