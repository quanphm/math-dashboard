import { ResponsiveSankey } from "@nivo/sankey";

import type { SankeyNodeDatum, SankeyLinkDatum } from "@nivo/sankey";

export type SankeyNode = { id: string; nodeColor: string };
export type SankeyLink = { source: string; target: string; value: number };

function TooltipShell({ children }: { children: React.ReactNode }) {
	return (
		<div className="border-border bg-card pointer-events-none z-50 min-w-max rounded-lg border px-3 py-2 shadow-md">
			{children}
		</div>
	);
}

function NodeTooltip({ node }: { node: SankeyNodeDatum<SankeyNode, SankeyLink> }) {
	return (
		<TooltipShell>
			<div className="flex items-center gap-2 text-xs">
				<span className="size-2.5 shrink-0 rounded-sm" style={{ backgroundColor: node.color }} />
				<span className="text-card-foreground">{node.id}</span>
			</div>
			<p className="text-muted-foreground mt-1 text-xs">
				Số sinh viên: <span className="text-card-foreground font-semibold">{node.value}</span>
			</p>
		</TooltipShell>
	);
}

function LinkTooltip({ link }: { link: SankeyLinkDatum<SankeyNode, SankeyLink> }) {
	return (
		<TooltipShell>
			<div className="text-card-foreground flex items-center gap-1 text-xs">
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
			<p className="text-muted-foreground mt-1 text-xs">
				Số sinh viên: <span className="text-card-foreground font-semibold">{link.value}</span>
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
		<div style={{ height }} className="relative overflow-hidden">
			<ResponsiveSankey
				data={{ nodes, links }}
				margin={{ top: 8, right: 24, bottom: 8, left: 24 }}
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
				labelPosition="inside"
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
