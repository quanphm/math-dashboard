import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbList,
	BreadcrumbPage,
} from "@math/ui/components/breadcrumb";
import { Separator } from "@math/ui/components/separator";
import { SidebarTrigger } from "@math/ui/components/sidebar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_dashboard/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<>
			<header className="flex h-12 shrink-0 items-center gap-2 border-b px-4">
				<SidebarTrigger className="-ml-1" />
				<Separator orientation="vertical" className="mr-2 h-4" />
				<Breadcrumb>
					<BreadcrumbList>
						<BreadcrumbItem>
							<BreadcrumbPage>Home</BreadcrumbPage>
						</BreadcrumbItem>
					</BreadcrumbList>
				</Breadcrumb>
			</header>
			<div className="flex flex-1 flex-col gap-4 p-4">
				<div className="grid auto-rows-min gap-4 md:grid-cols-3">
					<div className="bg-muted/50 aspect-video rounded-none" />
					<div className="bg-muted/50 aspect-video rounded-none" />
					<div className="bg-muted/50 aspect-video rounded-none" />
				</div>
				<div className="bg-muted/50 min-h-screen flex-1 rounded-none md:min-h-min" />
			</div>
		</>
	);
}
