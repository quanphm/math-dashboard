import type { auth } from "#api/lib/auth.ts";
import type { Hono } from "hono";

export type User = typeof auth.$Infer.Session.user;
export type Session = typeof auth.$Infer.Session.session;

export interface AppBindings {
	Variables: {
		user: User | null;
		session: Session | null;
	};
}

export type HonoApp = Hono<AppBindings>;
