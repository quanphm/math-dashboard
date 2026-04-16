import { Toaster } from "@math/ui/components/sonner";
import { TooltipProvider } from "@math/ui/components/tooltip";
import { ThemeProvider } from "next-themes";

export function UiProvider({ children }: { children: React.ReactNode }) {
	return (
		<ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
			<TooltipProvider>
				<Toaster />
				{children}
			</TooltipProvider>
		</ThemeProvider>
	);
}
