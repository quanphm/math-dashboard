import { signIn, signOut, signUp, useSession } from "#app/lib/auth-client.ts";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { data: session, isPending } = useSession();

	if (isPending) {
		return <div>Loading...</div>;
	}

	if (!session) {
		return (
			<div>
				<h1>Welcome</h1>
				<button
					onClick={async () => {
						await signIn.email({
							email: "user@example.com",
							password: "password123",
						});
					}}
				>
					Sign In
				</button>
				<button
					onClick={async () => {
						await signUp.email({
							email: "user@example.com",
							password: "password123",
							name: "John Doe",
						});
					}}
				>
					Sign Up
				</button>
			</div>
		);
	}

	return (
		<div>
			<h1>Hello {session.user.name}!</h1>
			<p>Email: {session.user.email}</p>
			<button onClick={async () => await signOut()}>Sign Out</button>
		</div>
	);
}
