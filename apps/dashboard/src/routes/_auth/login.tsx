import { SuperCenteredLayout } from "#app/components/layouts/super-centered-layout.tsx";
import { signIn } from "#app/lib/auth-client.ts";
import { sessionQueryOptions } from "#app/lib/queries/auth.ts";
import { Button } from "@math/ui/components/button";
import { Input } from "@math/ui/components/input";
import { Label } from "@math/ui/components/label";
import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

export const Route = createFileRoute("/_auth/login")({
	beforeLoad: async ({ context }) => {
		const session = await context.queryClient.fetchQuery(sessionQueryOptions);

		if (session) {
			throw redirect({ to: "/" });
		}
	},
	component: RouteComponent,
});

const loginSchema = z.object({
	email: z.string().min(1, "Email is required").email("Invalid email address"),
	password: z.string().min(1, "Password is required"),
});

function RouteComponent() {
	const router = useRouter();
	const [serverError, setServerError] = useState<string | null>(null);

	const form = useForm({
		defaultValues: {
			email: "",
			password: "",
		},
		onSubmit: async ({ value }) => {
			setServerError(null);
			const result = await signIn.email({
				email: value.email,
				password: value.password,
			});

			if (result.error) {
				setServerError(result.error.message ?? "Invalid credentials");
				return;
			}

			await router.navigate({ to: "/" });
		},
	});

	return (
		<SuperCenteredLayout>
			<div className="flex flex-col gap-2 text-center">
				<h1 className="text-2xl font-bold tracking-tight">Sign in</h1>
			</div>

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="flex flex-col gap-4"
			>
				<form.Field
					name="email"
					validators={{
						onChange: ({ value }) => {
							const result = loginSchema.shape.email.safeParse(value);
							return result.success ? undefined : result.error.issues[0]?.message;
						},
					}}
				>
					{(field) => (
						<div className="flex flex-col gap-1.5">
							<Label htmlFor={field.name}>Email</Label>
							<Input
								id={field.name}
								type="email"
								placeholder="you@example.com"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								aria-invalid={field.state.meta.errors.length > 0}
								autoComplete="email"
							/>
							{field.state.meta.errors.length > 0 && (
								<p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
							)}
						</div>
					)}
				</form.Field>

				<form.Field
					name="password"
					validators={{
						onChange: ({ value }) => {
							const result = loginSchema.shape.password.safeParse(value);
							return result.success ? undefined : result.error.issues[0]?.message;
						},
					}}
				>
					{(field) => (
						<div className="flex flex-col gap-1.5">
							<Label htmlFor={field.name}>Password</Label>
							<Input
								id={field.name}
								type="password"
								placeholder="••••••••"
								value={field.state.value}
								onBlur={field.handleBlur}
								onChange={(e) => field.handleChange(e.target.value)}
								aria-invalid={field.state.meta.errors.length > 0}
								autoComplete="current-password"
							/>
							{field.state.meta.errors.length > 0 && (
								<p className="text-destructive text-xs">{field.state.meta.errors[0]}</p>
							)}
						</div>
					)}
				</form.Field>

				{serverError && <p className="text-destructive text-center text-sm">{serverError}</p>}

				<form.Subscribe selector={(state) => state.isSubmitting}>
					{(isSubmitting) => (
						<Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
							{isSubmitting ? "Signing in…" : "Sign in"}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</SuperCenteredLayout>
	);
}
