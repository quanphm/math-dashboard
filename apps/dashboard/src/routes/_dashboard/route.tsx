import { sessionQueryOptions } from "#app/lib/queries/auth.ts";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard")({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.fetchQuery(sessionQueryOptions);

		if (!session) {
			throw redirect({
				to: "/login",
				search: { redirect: location.href },
			});
		}

		return { session };
	},
	component: RouteComponent,
});

function RouteComponent() {
	return <Outlet />;
}
