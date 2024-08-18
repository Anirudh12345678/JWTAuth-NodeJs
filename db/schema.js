import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("auth_user",{
    id: serial("id").primaryKey(),
    username: text("username").notNull(),
    pass: text("password").notNull()
})
