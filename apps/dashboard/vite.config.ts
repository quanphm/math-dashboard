import tailwindcss from "@tailwindcss/vite";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	envPrefix: "PUBLIC_",
	plugins: [
		devtools({
			consolePiping: {
				enabled: false,
			},
			enhancedLogs: {
				enabled: false,
			},
		}),
		tailwindcss(),
		tanstackRouter({ target: "react", autoCodeSplitting: false }),
		viteReact(),
	],
});
