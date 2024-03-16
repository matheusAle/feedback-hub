import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const events = sqliteTable("events", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
});

export const eventsRelations = relations(events, ({ many }) => ({
  feedbacks: many(feedbacks),
  sessions: many(usersSessions),
}));

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  password: text("password").notNull(),
  username: text("username").notNull().unique(),
});

export const usersSessions = sqliteTable("usersSessions", {
  id: text("id").primaryKey(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
  token: text("token").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  endedAt: integer("endedAt", { mode: "timestamp" }),
});

export const usersSessionsRelations = relations(usersSessions, ({ one }) => ({
  user: one(users, { fields: [usersSessions.userId], references: [users.id] }),
}));

export const usersRelations = relations(users, ({ many }) => ({
  feedbacks: many(feedbacks),
}));

export const feedbacks = sqliteTable("feedbacks", {
  id: text("id").primaryKey(),
  content: text("content").notNull(),
  rate: integer("rate").notNull(),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull(),
  eventId: text("eventId")
    .references(() => events.id)
    .notNull(),
  userId: text("userId")
    .references(() => users.id)
    .notNull(),
});

export const feedBacksRelations = relations(feedbacks, ({ one }) => ({
  event: one(events, { fields: [feedbacks.eventId], references: [events.id] }),
  user: one(users, { fields: [feedbacks.userId], references: [users.id] }),
}));
