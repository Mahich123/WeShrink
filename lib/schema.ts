import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import {
  boolean,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";
import db from ".";

export const roles = pgEnum("role", ["user", "admin"]);

export const userTable = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull(),
  username: text("name").notNull().unique(),
  hashedPassword: text("hashed_Password"),
  role: roles("role").notNull().default("user"),
});

export const sessionTable = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const urls = pgTable("urls", {
  id: serial("id").primaryKey(),
  name: text("name"),
  longurl: text("longurl"),
  user: text("user"),
  email: text("email"),
  shortCode: text("shortCode"),
  shortenedUrl: text("shortenedUrl"),
  expiresAt: timestamp('expires_at').notNull(),
  expired: boolean("expired").default(false),
});

const adapter = new DrizzlePostgreSQLAdapter(db, sessionTable, userTable);

export default adapter;
