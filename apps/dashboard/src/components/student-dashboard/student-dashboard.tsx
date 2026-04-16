import { Button } from "@math/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@math/ui/components/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@math/ui/components/table";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import {
	Bar,
	BarChart,
	Cell,
	LabelList,
	Pie,
	PieChart,
	ResponsiveContainer,
	XAxis,
	YAxis,
} from "recharts";

import {
	BAR_COLOR_SCALE,
	BAR_DATA,
	COHORTS,
	DONUT_DATA,
	GPA_RANGES,
	PTXT_LEGEND,
	SANKEY_LINKS,
	SANKEY_NODES,
	YEARS,
} from "./data.ts";
import { SankeyChart } from "./sankey-chart.tsx";

type SoftSelectProps = {
	label: string;
	value: string;
	options: readonly string[];
	onChange: (v: string) => void;
	labelClassName?: string;
};

function SoftSelect({ label, value, options, onChange, labelClassName }: SoftSelectProps) {
	return (
		<label className="flex flex-col gap-1.5 text-sm">
			<span className={labelClassName ?? "text-muted-foreground font-medium"}>{label}</span>
			<div className="relative">
				<select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="border-border bg-background text-foreground hover:border-input focus:border-ring focus:ring-ring/20 w-full appearance-none rounded-lg border px-3 py-2 pr-9 text-sm shadow-sm transition focus:ring-2 focus:outline-none"
				>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				<ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
			</div>
		</label>
	);
}

export function StudentDashboard() {
	const [cohort, setCohort] = useState("Khóa 2021");
	const [year, setYear] = useState("2021-2022");
	const [gpa, setGpa] = useState("gpa>=7_and_<8.5");
	const totalStudents = DONUT_DATA.reduce((a, b) => a + b.value, 0);

	return (
		<div className="min-h-full p-4 md:p-6">
			<div className="mb-6 flex flex-col gap-3">
				<h1 className="text-xl font-bold tracking-tight">
					Bảng theo dõi kết quả học tập của học sinh
				</h1>
				<div className="flex items-center gap-3">
					<span className="text-primary text-sm font-semibold">Chọn Khóa đào tạo:</span>
					<div className="relative">
						<select
							value={cohort}
							onChange={(e) => setCohort(e.target.value)}
							className="border-border bg-background text-foreground hover:border-input focus:border-ring focus:ring-ring/20 appearance-none rounded-lg border px-4 py-1.5 pr-9 text-sm font-medium shadow-sm transition focus:ring-2 focus:outline-none"
						>
							{COHORTS.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
						<ChevronDownIcon className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2" />
					</div>
				</div>
			</div>

			{/* Top row: Legend + Sankey */}
			<div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(240px,280px)_1fr]">
				{/* PTXT Legend */}
				<Card>
					<CardHeader>
						<CardTitle>Phương thức xét tuyển (PTXT)</CardTitle>
					</CardHeader>
					<CardContent className="max-h-[440px] overflow-y-auto p-0">
						<Table className="table-fixed border-collapse text-xs">
							<TableHeader className="bg-background/95 sticky top-0 backdrop-blur">
								<TableRow>
									<TableHead className="w-16 px-3 py-2 font-semibold">Chú thích</TableHead>
									<TableHead className="px-3 py-2 font-semibold">Tên PTXT</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{PTXT_LEGEND.map((row) => (
									<TableRow key={row.code} className="hover:bg-accent/40">
										<TableCell className="px-3 py-2.5 align-top font-semibold">
											{row.code}
										</TableCell>
										<TableCell className="text-muted-foreground px-3 py-2.5 align-top leading-snug whitespace-normal">
											{row.name}
										</TableCell>
									</TableRow>
								))}
							</TableBody>
						</Table>
					</CardContent>
				</Card>

				{/* Sankey */}
				<Card>
					<CardHeader>
						<CardTitle>Sự chuyển đổi về số lượng sinh viên qua từng giai đoạn</CardTitle>
						<CardDescription>
							xét tuyển đầu vào, chọn ngành, cơ sở ngành (CSN), chuyên ngành (CN) và tốt nghiệp
						</CardDescription>
					</CardHeader>
					<CardContent>
						<SankeyChart nodes={SANKEY_NODES} links={SANKEY_LINKS} height={440} />
					</CardContent>
				</Card>
			</div>

			{/* Bottom row: Donut + Filters | Bar chart */}
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(240px,280px)_1fr]">
				<div className="flex flex-col gap-5">
					{/* Donut card */}
					<Card>
						<CardHeader>
							<CardTitle>Tổng số lượng SV đầu vào</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="relative h-[200px]">
								<ResponsiveContainer width="100%" height="100%">
									<PieChart>
										<Pie
											data={DONUT_DATA}
											dataKey="value"
											nameKey="name"
											innerRadius={56}
											outerRadius={82}
											paddingAngle={2}
											strokeWidth={0}
										>
											{DONUT_DATA.map((d) => (
												<Cell key={d.name} fill={d.color} />
											))}
										</Pie>
									</PieChart>
								</ResponsiveContainer>
								<div className="pointer-events-none absolute inset-0 flex items-center justify-center">
									<span className="text-foreground text-2xl font-bold">{totalStudents}</span>
								</div>
							</div>
							<div className="mt-2 flex items-center justify-around text-xs">
								{DONUT_DATA.map((d) => (
									<div key={d.name} className="flex flex-col items-center gap-1">
										<div className="flex items-center gap-1.5">
											<span className="size-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
											<span className="text-muted-foreground font-medium">{d.name}</span>
										</div>
										<span className="text-foreground font-semibold">{d.value}</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>

					{/* Filters card */}
					<Card>
						<CardContent className="flex flex-col gap-4">
							<SoftSelect
								label="Chọn năm học:"
								value={year}
								options={YEARS}
								onChange={setYear}
								labelClassName="font-semibold text-foreground"
							/>
							<SoftSelect
								label="Chọn thang điểm GPA:"
								value={gpa}
								options={GPA_RANGES}
								onChange={setGpa}
								labelClassName="font-semibold text-foreground"
							/>
							<Button className="bg-primary text-primary-foreground hover:bg-primary/90 mt-2 w-full rounded-lg shadow-sm">
								Xác nhận
							</Button>
						</CardContent>
					</Card>
				</div>

				{/* Bar chart */}
				<Card>
					<CardHeader>
						<CardTitle>
							Tổng số lượng SV có ĐTB tích lũy:{" "}
							<span className="text-primary font-mono">{gpa}</span> trong năm học{" "}
							<span className="text-primary font-mono">{year.replace("-", "-")}</span>
						</CardTitle>
					</CardHeader>
					<CardContent>
						<div className="h-[360px]">
							<ResponsiveContainer width="100%" height="100%">
								<BarChart
									data={BAR_DATA}
									layout="vertical"
									margin={{ top: 8, right: 40, bottom: 32, left: 24 }}
								>
									<XAxis
										type="number"
										axisLine={{ stroke: "var(--border)" }}
										tickLine={false}
										tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
										label={{
											value: "Số lượng sinh viên",
											position: "insideBottom",
											offset: -16,
											style: { fill: "var(--muted-foreground)", fontSize: 12, fontWeight: 500 },
										}}
									/>
									<YAxis
										dataKey="code"
										type="category"
										width={64}
										axisLine={{ stroke: "var(--border)" }}
										tickLine={false}
										tick={{ fill: "var(--muted-foreground)", fontSize: 12, fontWeight: 600 }}
										label={{
											value: "Phương thức xét tuyển (PTXT)",
											angle: -90,
											position: "insideLeft",
											style: {
												fill: "var(--muted-foreground)",
												fontSize: 12,
												fontWeight: 500,
												textAnchor: "middle",
											},
										}}
									/>
									<Bar dataKey="value" radius={[0, 6, 6, 0]} barSize={22}>
										{BAR_DATA.map((d, i) => (
											<Cell key={d.code} fill={BAR_COLOR_SCALE[i] ?? "#93c5fd"} />
										))}
										<LabelList
											dataKey="value"
											position="right"
											className="fill-muted-foreground"
											style={{ fontSize: 12, fontWeight: 600 }}
										/>
									</Bar>
								</BarChart>
							</ResponsiveContainer>
						</div>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
