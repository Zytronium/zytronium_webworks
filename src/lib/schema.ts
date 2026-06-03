import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const orders = sqliteTable("orders", {
    id:                 integer("id").primaryKey({ autoIncrement: true }),
    createdAt:          text("created_at").default(sql`(datetime('now'))`).notNull(),
    status:             text("status").default("new").notNull(), // new | reviewed | contacted | completed | archived

    // Contact info
    name:               text("name").notNull(),
    email:              text("email").notNull(),
    phone:              text("phone").notNull(),
    location:           text("location").notNull(),
    business:           text("business").notNull(),

    // Project info
    scope:              text("scope").notNull(),
    features:           text("features").notNull(), // JSON array stored as text
    projectDescription: text("project_description").notNull(),
    domain:             text("domain").notNull(),
    hosting:            text("hosting").notNull(),
    showcase:           text("showcase").notNull(),

    // Pricing snapshot at time of submission
    estimatedMin:       integer("estimated_min"),
    estimatedMax:       integer("estimated_max"),

    // Admin notes (for later use in admin panel)
    adminNotes:         text("admin_notes"),
});

export type Order = typeof orders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
