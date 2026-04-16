import { authClient } from "#app/lib/auth-client.ts";
import { queryOptions } from "@tanstack/react-query";

export const sessionQueryOptions = queryOptions({
	queryKey: ["session"],
	queryFn: async () => {
		const { data } = await authClient.getSession();
		return data;
	},
	staleTime: 60_000,
});
