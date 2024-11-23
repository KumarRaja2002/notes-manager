CREATE TYPE "public"."category" AS ENUM('Others', 'Personal', 'Work', 'Study', 'Miscellaneous');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text NOT NULL,
	"category" "category" DEFAULT 'Others',
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
