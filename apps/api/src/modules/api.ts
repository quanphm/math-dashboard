import { createHonoInstance } from "#api/lib/create-app.ts";
import { redis } from "#api/lib/redis.ts";
import { openAPIRouteHandler } from "hono-openapi";
import { cors } from "hono/cors";

import pkg from "../../package.json" with { type: "json" };

const API_VERSION = pkg.version;

export function apiModule() {
	const app = createHonoInstance().use(
		cors({
			origin: [process.env.PUBLIC_APP_BASE_URL!],
			exposeHeaders: ["Content-Length", "Content-Encoding"],
			credentials: true,
		}),
	);
	// .use(authGuard());

	app.get(
		"/openapi",
		openAPIRouteHandler(app, {
			documentation: {
				info: {
					title: "Hoalu API",
					description: "OpenAPI documentation",
					version: API_VERSION,
				},
				servers: [{ url: process.env.PUBLIC_API_URL! }],
			},
		}),
	);

	return app;
}

export type ApiRoutes = ReturnType<typeof apiModule>;
