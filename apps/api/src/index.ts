import { createApp } from "#api/lib/create-app.ts";
import { userSession } from "#api/middlewares/user-session.ts";
import { apiModule } from "#api/modules/api.ts";
import { authModule } from "#api/modules/auth.ts";
import { openAPIModule } from "#api/modules/openapi.ts";

export const app = createApp().basePath("/api");

const authRoute = authModule();
const apiRoute = apiModule();

openAPIModule(app);

app.use(userSession);
// .route("/", authRoute)
// .route("/", apiRoute)
// import type { ApiRoutes } from "#api/modules/api.ts";

export default {
	port: 4000,
	fetch: app.fetch,
	idleTimeout: 60,
};

// export type { ApiRoutes };
