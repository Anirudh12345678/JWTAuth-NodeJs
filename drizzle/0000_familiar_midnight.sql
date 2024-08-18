CREATE TABLE IF NOT EXISTS "auth_user" (
	"id" serial PRIMARY KEY NOT NULL,
	"username" text NOT NULL,
	"password" text NOT NULL
);
