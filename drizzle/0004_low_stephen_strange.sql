ALTER TABLE "users_table" ADD COLUMN "created_at" timestamp DEFAULT now();--> statement-breakpoint
ALTER TABLE "users_table" ADD COLUMN "updated_at" timestamp DEFAULT now();