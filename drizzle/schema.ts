import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Files table for storing file metadata and S3 references
 */
export const files = mysqlTable("files", {
  id: int("id").autoincrement().primaryKey(),
  /** Original filename as uploaded by user */
  filename: varchar("filename", { length: 255 }).notNull(),
  /** S3 storage key/path */
  s3Key: varchar("s3Key", { length: 512 }).notNull().unique(),
  /** Public URL for accessing the file */
  url: text("url").notNull(),
  /** MIME type of the file */
  mimeType: varchar("mimeType", { length: 100 }),
  /** File size in bytes */
  fileSize: int("fileSize"),
  /** User who uploaded the file */
  uploadedBy: int("uploadedBy").references(() => users.id),
  /** File category: team-photo, marketing-asset, content, etc. */
  category: varchar("category", { length: 50 }),
  /** Associated team member ID if applicable */
  teamMemberId: varchar("teamMemberId", { length: 100 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type File = typeof files.$inferSelect;
export type InsertFile = typeof files.$inferInsert;