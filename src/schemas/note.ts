import { pgTable, serial, varchar, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';

export const categoryEnum = pgEnum('category', ['Others', 'Personal', 'Work', 'Study', 'Miscellaneous']);

export const notes = pgTable('notes', {
  id: serial('id').primaryKey().notNull(),

  title: varchar('title', { length: 255 }).notNull(),
  description: text('description').notNull(),

  category: categoryEnum('category').default('Others'),
  
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});

export type Note = typeof notes.$inferSelect;
export type NewNote = typeof notes.$inferInsert;
export type NoteTable = typeof notes;
