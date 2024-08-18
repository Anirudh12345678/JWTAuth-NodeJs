import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "./schema.js"
const client = new pg.Client({
  host: "127.0.0.1",
  port: 5432,
  user: "postgres",
  password: "123",
  database: "drizzle_db",
});

await client.connect().then(()=>{
    console.log("Connected")
});
export const db = drizzle(client,{schema});
export default db;