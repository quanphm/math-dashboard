import { Toaster } from "@math/ui/components/sonner";
import { TooltipProvider } from "@math/ui/components/tooltip";

export function UiProvider({ children }: { children: React.ReactNode }) {
	return (
		<TooltipProvider>
			<Toaster />
			{children}
		</TooltipProvider>
	);
}
