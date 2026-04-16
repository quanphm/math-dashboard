import { Button } from "@math/ui/components/button";
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
			<span className={labelClassName ?? "font-medium text-slate-700"}>{label}</span>
			<div className="relative">
				<select
					value={value}
					onChange={(e) => onChange(e.target.value)}
					className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2 pr-9 text-sm text-slate-700 shadow-sm transition hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
				>
					{options.map((opt) => (
						<option key={opt} value={opt}>
							{opt}
						</option>
					))}
				</select>
				<ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-slate-400" />
			</div>
		</label>
	);
}

function Card({ className, children }: { className?: string; children: React.ReactNode }) {
	return (
		<div
			className={`rounded-2xl border border-slate-200/70 bg-white shadow-[0_1px_2px_rgba(15,23,42,0.04),0_6px_20px_-8px_rgba(15,23,42,0.08)] ${className ?? ""}`}
		>
			{children}
		</div>
	);
}

export function StudentDashboard() {
	const [cohort, setCohort] = useState("Khóa 2021");
	const [year, setYear] = useState("2021-2022");
	const [gpa, setGpa] = useState("gpa>=7_and_<8.5");
	const totalStudents = DONUT_DATA.reduce((a, b) => a + b.value, 0);

	return (
		<div className="min-h-full bg-gradient-to-br from-slate-50 via-white to-blue-50/40 p-4 md:p-6">
			{/* Header */}
			<div className="mb-6 flex flex-col items-center gap-3 text-center">
				<h1 className="bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-700 bg-clip-text text-2xl font-bold tracking-tight text-transparent md:text-3xl">
					Bảng theo dõi kết quả học tập của học sinh
				</h1>
				<div className="flex items-center gap-3">
					<span className="text-sm font-semibold text-blue-900">Chọn Khóa đào tạo:</span>
					<div className="relative">
						<select
							value={cohort}
							onChange={(e) => setCohort(e.target.value)}
							className="appearance-none rounded-lg border border-slate-200 bg-white px-4 py-1.5 pr-9 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 focus:outline-none"
						>
							{COHORTS.map((c) => (
								<option key={c} value={c}>
									{c}
								</option>
							))}
						</select>
						<ChevronDownIcon className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-slate-400" />
					</div>
				</div>
			</div>

			{/* Top row: Legend + Sankey */}
			<div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[minmax(240px,280px)_1fr]">
				{/* PTXT Legend */}
				<Card className="overflow-hidden">
					<div className="border-b border-slate-200/70 bg-slate-50/60 px-4 py-3 text-xs font-semibold tracking-wide text-slate-600 uppercase">
						Phương thức xét tuyển
					</div>
					<div className="max-h-[440px] overflow-y-auto">
						<table className="w-full table-fixed border-collapse text-xs">
							<thead className="sticky top-0 bg-white/95 backdrop-blur">
								<tr className="border-b border-slate-200">
									<th className="w-16 px-3 py-2 text-left font-semibold text-slate-700">
										Chú thích
									</th>
									<th className="px-3 py-2 text-left font-semibold text-slate-700">Tên PTXT</th>
								</tr>
							</thead>
							<tbody>
								{PTXT_LEGEND.map((row) => (
									<tr
										key={row.code}
										className="border-b border-slate-100 transition hover:bg-blue-50/40"
									>
										<td className="px-3 py-2.5 align-top font-semibold text-slate-800">
											{row.code}
										</td>
										<td className="px-3 py-2.5 align-top leading-snug text-slate-600">
											{row.name}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</Card>

				{/* Sankey */}
				<Card className="p-4">
					<p className="mb-2 text-center text-sm leading-snug font-medium text-slate-600">
						Sự chuyển đổi về số lượng sinh viên qua từng giai đoạn:
						<br />
						xét tuyển đầu vào, chọn ngành, cơ sở ngành (CSN), chuyên ngành (CN) và tốt nghiệp
					</p>
					<SankeyChart nodes={SANKEY_NODES} links={SANKEY_LINKS} height={440} />
				</Card>
			</div>

			{/* Bottom row: Donut + Filters | Bar chart */}
			<div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(240px,280px)_1fr]">
				<div className="flex flex-col gap-5">
					{/* Donut card */}
					<Card className="p-4">
						<h3 className="text-sm font-semibold text-slate-800">Tổng số lượng SV đầu vào:</h3>
						<div className="relative mt-2 h-[200px]">
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
								<span className="text-2xl font-bold text-slate-900">{totalStudents}</span>
							</div>
						</div>
						<div className="mt-2 flex items-center justify-around text-xs">
							{DONUT_DATA.map((d) => (
								<div key={d.name} className="flex flex-col items-center gap-1">
									<div className="flex items-center gap-1.5">
										<span className="size-2.5 rounded-sm" style={{ backgroundColor: d.color }} />
										<span className="font-medium text-slate-600">{d.name}</span>
									</div>
									<span className="font-semibold text-slate-800">{d.value}</span>
								</div>
							))}
						</div>
					</Card>

					{/* Filters card */}
					<Card className="flex flex-col gap-4 p-4">
						<SoftSelect
							label="Chọn năm học:"
							value={year}
							options={YEARS}
							onChange={setYear}
							labelClassName="font-semibold text-slate-800"
						/>
						<SoftSelect
							label="Chọn thang điểm GPA:"
							value={gpa}
							options={GPA_RANGES}
							onChange={setGpa}
							labelClassName="font-semibold text-slate-800"
						/>
						<Button className="mt-2 w-full rounded-lg bg-blue-900 text-white shadow-sm hover:bg-blue-800">
							Xác nhận
						</Button>
					</Card>
				</div>

				{/* Bar chart */}
				<Card className="p-4">
					<h3 className="mb-2 text-sm font-semibold text-slate-800">
						Tổng số lượng SV có ĐTB tích lũy: <span className="font-mono text-blue-800">{gpa}</span>{" "}
						trong năm học <span className="font-mono text-blue-800">{year.replace("-", "-")}</span>
					</h3>
					<div className="h-[360px]">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={BAR_DATA}
								layout="vertical"
								margin={{ top: 8, right: 40, bottom: 32, left: 24 }}
							>
								<XAxis
									type="number"
									axisLine={{ stroke: "#cbd5e1" }}
									tickLine={false}
									tick={{ fill: "#64748b", fontSize: 12 }}
									label={{
										value: "Số lượng sinh viên",
										position: "insideBottom",
										offset: -16,
										style: { fill: "#475569", fontSize: 12, fontWeight: 500 },
									}}
								/>
								<YAxis
									dataKey="code"
									type="category"
									width={64}
									axisLine={{ stroke: "#cbd5e1" }}
									tickLine={false}
									tick={{ fill: "#64748b", fontSize: 12, fontWeight: 600 }}
									label={{
										value: "Phương thức xét tuyển (PTXT)",
										angle: -90,
										position: "insideLeft",
										style: {
											fill: "#475569",
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
										className="fill-slate-600"
										style={{ fontSize: 12, fontWeight: 600 }}
									/>
								</Bar>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</Card>
			</div>
		</div>
	);
}
