import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db } from './connect.js';

async function migrateData() {
    await migrate(db, { migrationsFolder: './drizzle' });
    process.exit(0)
}

migrateData()