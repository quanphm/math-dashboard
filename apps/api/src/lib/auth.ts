import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "#api/db/index.ts";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg",
	}),
	secret: process.env.AUTH_SECRET,
	baseURL: process.env.AUTH_URL,
	emailAndPassword: {
		enabled: true,
	},
	advanced: {
		cookiePrefix: "math",
	},
	trustedOrigins: [process.env.PUBLIC_APP_BASE_URL!],
});
