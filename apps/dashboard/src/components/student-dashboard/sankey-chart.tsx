import type { SankeyNodeDatum, SankeyLinkDatum } from "@nivo/sankey";
import { ResponsiveSankey } from "@nivo/sankey";

export type SankeyNode = { id: string; nodeColor: string };
export type SankeyLink = { source: string; target: string; value: number };

// Shared tooltip shell — matches shadcn Card style using theme CSS variables.
function TooltipShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="pointer-events-none z-50 rounded-lg border border-border bg-card px-3 py-2 shadow-md">
			{children}
		</div>
	);
}

function NodeTooltip({ node }: { node: SankeyNodeDatum<SankeyNode, SankeyLink> }) {
	return (
		<TooltipShell>
			<div className="flex items-center gap-2">
				<span
					className="size-2.5 shrink-0 rounded-sm"
					style={{ backgroundColor: node.color }}
				/>
				<span className="text-sm font-medium text-card-foreground">{node.id}</span>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">
				Số sinh viên:{" "}
				<span className="font-semibold text-card-foreground">{node.value}</span>
			</p>
		</TooltipShell>
	);
}

function LinkTooltip({
	link,
}: {
	link: SankeyLinkDatum<SankeyNode, SankeyLink>;
}) {
	return (
		<TooltipShell>
			<div className="flex items-center gap-1.5 text-sm font-medium text-card-foreground">
				<span
					className="size-2 shrink-0 rounded-sm"
					style={{ backgroundColor: link.source.color }}
				/>
				<span>{link.source.id}</span>
				<span className="text-muted-foreground">→</span>
				<span
					className="size-2 shrink-0 rounded-sm"
					style={{ backgroundColor: link.target.color }}
				/>
				<span>{link.target.id}</span>
			</div>
			<p className="mt-1 text-xs text-muted-foreground">
				Số sinh viên:{" "}
				<span className="font-semibold text-card-foreground">{link.value}</span>
			</p>
		</TooltipShell>
	);
}

type SankeyChartProps = {
	nodes: SankeyNode[];
	links: SankeyLink[];
	height?: number;
};

export function SankeyChart({ nodes, links, height = 440 }: SankeyChartProps) {
	return (
		<div style={{ height }}>
			<ResponsiveSankey
				data={{ nodes, links }}
				margin={{ top: 8, right: 160, bottom: 8, left: 8 }}
				align="justify"
				colors={{ datum: "nodeColor" }}
				nodeOpacity={1}
				nodeThickness={14}
				nodeInnerPadding={3}
				nodeSpacing={14}
				nodeBorderWidth={0}
				nodeBorderRadius={3}
				linkOpacity={0.35}
				linkHoverOpacity={0.6}
				linkHoverOthersOpacity={0.15}
				linkContract={2}
				enableLinkGradient
				labelPosition="outside"
				labelOrientation="horizontal"
				labelPadding={10}
				labelTextColor={{ from: "color", modifiers: [["darker", 1.4]] }}
				nodeTooltip={NodeTooltip}
				linkTooltip={LinkTooltip}
				animate
			/>
		</div>
	);
}
