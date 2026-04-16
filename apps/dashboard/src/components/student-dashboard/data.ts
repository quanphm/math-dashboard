// Mock data matching the reference dashboard (student academic progression).
// Numbers are approximate and meant for visual fidelity, not analytic accuracy.

export const PTXT_LEGEND = [
	{ code: "PT01", name: "Tuyển thẳng & UTXT cho người tham gia/đạt giải các kỳ thi HSG, KHKT" },
	{ code: "PT02", name: "UTXT cho học sinh giỏi nhất trường THPT & UTXT cho học sinh giỏi" },
	{ code: "PT03", name: "Kết quả kỳ thi THPTQG" },
	{ code: "PT04", name: "Kết quả kỳ thi ĐGNL" },
	{ code: "PT05", name: "Dựa trên kỳ thi quốc tế" },
	{ code: "PT06", name: "Dành cho các ngành có hệ CLC/TT" },
	{ code: "PT07", name: "Đặc cách tốt nghiệp THPT" },
	{ code: "PT7B", name: "Xét tuyển kết hợp IELTS / SAT" },
];

const NODE_COLORS: Record<string, string> = {
	PT01: "#4C78A8",
	PT02: "#F58518",
	PT03: "#54A24B",
	PT04: "#E45756",
	PT05: "#B279A2",
	PT06: "#9D755D",
	PT07: "#A87C68",
	PT7B: "#D16BA5",
	"Nhóm ngành Toán học": "#C9B458",
	"Nhóm ngành Khoa học dữ liệu": "#8B8B8B",
	"Ngành Khoa học dữ liệu": "#EF8A62",
	"Ngành Toán học": "#E15759",
	"Ngành Toán ứng dụng": "#4E79A7",
	"Ngành Toán tin": "#59A14F",
	"Khoa học dữ liệu 1": "#2FA4A4",
	"Đại số": "#4B4E9D",
	"Giải tích số": "#66D9E8",
	"Giải tích": "#F1C232",
	"Xác suất thống kê": "#F4A261",
	"Toán tài chính": "#7B7FD1",
	"Cơ học": "#A78BFA",
	"Tối ưu và hệ thống": "#9F7AEA",
	"Lý luận và phương pháp giảng dạy môn Toán": "#E9C46A",
	"Khoa học dữ liệu 2": "#D6608A",
	"Toán tin ứng dụng": "#3AA9A9",
	"Phương pháp Toán trong Tin học": "#E07A5F",
	"TỐT NGHIỆP": "#E9C46A",
	"CÒN HỌC TIẾP": "#D6608A",
	"NGHỈ HỌC (CSN)": "#66D9E8",
	"NGHỈ HỌC (CN)": "#EF8A62",
};

type RawLink = { source: string; target: string; value: number };

const LINKS_L0_L1: RawLink[] = [
	{ source: "PT03", target: "Nhóm ngành Toán học", value: 62 },
	{ source: "PT03", target: "Nhóm ngành Khoa học dữ liệu", value: 26 },
	{ source: "PT7B", target: "Nhóm ngành Toán học", value: 32 },
	{ source: "PT7B", target: "Nhóm ngành Khoa học dữ liệu", value: 13 },
	{ source: "PT02", target: "Nhóm ngành Toán học", value: 25 },
	{ source: "PT02", target: "Nhóm ngành Khoa học dữ liệu", value: 11 },
	{ source: "PT01", target: "Nhóm ngành Toán học", value: 24 },
	{ source: "PT01", target: "Nhóm ngành Khoa học dữ liệu", value: 10 },
	{ source: "PT04", target: "Nhóm ngành Toán học", value: 22 },
	{ source: "PT04", target: "Nhóm ngành Khoa học dữ liệu", value: 10 },
	{ source: "PT05", target: "Nhóm ngành Toán học", value: 22 },
	{ source: "PT05", target: "Nhóm ngành Khoa học dữ liệu", value: 10 },
	{ source: "PT07", target: "Nhóm ngành Toán học", value: 23 },
	{ source: "PT07", target: "Nhóm ngành Khoa học dữ liệu", value: 10 },
];

const LINKS_L1_L2: RawLink[] = [
	{ source: "Nhóm ngành Toán học", target: "Ngành Toán học", value: 83 },
	{ source: "Nhóm ngành Toán học", target: "Ngành Toán ứng dụng", value: 72 },
	{ source: "Nhóm ngành Toán học", target: "Ngành Toán tin", value: 44 },
	{ source: "Nhóm ngành Toán học", target: "Ngành Khoa học dữ liệu", value: 11 },
	{ source: "Nhóm ngành Khoa học dữ liệu", target: "Ngành Khoa học dữ liệu", value: 76 },
	{ source: "Nhóm ngành Khoa học dữ liệu", target: "Ngành Toán ứng dụng", value: 3 },
];

const LINKS_L2_L3: RawLink[] = [
	{ source: "Ngành Khoa học dữ liệu", target: "Khoa học dữ liệu 1", value: 75 },
	{ source: "Ngành Khoa học dữ liệu", target: "Khoa học dữ liệu 2", value: 12 },
	{ source: "Ngành Toán học", target: "Đại số", value: 26 },
	{ source: "Ngành Toán học", target: "Giải tích", value: 14 },
	{ source: "Ngành Toán học", target: "Xác suất thống kê", value: 16 },
	{ source: "Ngành Toán học", target: "Lý luận và phương pháp giảng dạy môn Toán", value: 10 },
	{ source: "Ngành Toán học", target: "Giải tích số", value: 17 },
	{ source: "Ngành Toán ứng dụng", target: "Toán tài chính", value: 17 },
	{ source: "Ngành Toán ứng dụng", target: "Cơ học", value: 24 },
	{ source: "Ngành Toán ứng dụng", target: "Tối ưu và hệ thống", value: 21 },
	{ source: "Ngành Toán ứng dụng", target: "Giải tích số", value: 7 },
	{ source: "Ngành Toán ứng dụng", target: "Khoa học dữ liệu 1", value: 6 },
	{ source: "Ngành Toán tin", target: "Toán tin ứng dụng", value: 15 },
	{ source: "Ngành Toán tin", target: "Phương pháp Toán trong Tin học", value: 16 },
	{ source: "Ngành Toán tin", target: "Khoa học dữ liệu 1", value: 5 },
	{ source: "Ngành Toán tin", target: "Giải tích", value: 8 },
];

const SPECIALIZATIONS = [
	"Khoa học dữ liệu 1",
	"Khoa học dữ liệu 2",
	"Đại số",
	"Giải tích",
	"Xác suất thống kê",
	"Lý luận và phương pháp giảng dạy môn Toán",
	"Giải tích số",
	"Toán tài chính",
	"Cơ học",
	"Tối ưu và hệ thống",
	"Toán tin ứng dụng",
	"Phương pháp Toán trong Tin học",
];

const SPEC_TOTALS: Record<string, number> = {
	"Khoa học dữ liệu 1": 86,
	"Khoa học dữ liệu 2": 12,
	"Đại số": 26,
	"Giải tích": 22,
	"Xác suất thống kê": 16,
	"Lý luận và phương pháp giảng dạy môn Toán": 10,
	"Giải tích số": 24,
	"Toán tài chính": 17,
	"Cơ học": 24,
	"Tối ưu và hệ thống": 21,
	"Toán tin ứng dụng": 15,
	"Phương pháp Toán trong Tin học": 16,
};

const LINKS_L3_L4: RawLink[] = SPECIALIZATIONS.flatMap((spec) => {
	const total = SPEC_TOTALS[spec] ?? 0;
	const graduated = Math.round(total * 0.8);
	const continuing = Math.round(total * 0.14);
	const dropoutCsn = Math.max(0, Math.round(total * 0.04));
	const dropoutCn = Math.max(0, total - graduated - continuing - dropoutCsn);
	return [
		{ source: spec, target: "TỐT NGHIỆP", value: graduated },
		{ source: spec, target: "CÒN HỌC TIẾP", value: continuing },
		{ source: spec, target: "NGHỈ HỌC (CSN)", value: dropoutCsn },
		{ source: spec, target: "NGHỈ HỌC (CN)", value: dropoutCn },
	].filter((l) => l.value > 0);
});

const ALL_LINKS: RawLink[] = [
	...LINKS_L0_L1,
	...LINKS_L1_L2,
	...LINKS_L2_L3,
	...LINKS_L3_L4,
].filter((l) => l.value > 0);

// Collect unique node IDs from links (preserves appearance order).
const nodeIds = Array.from(
	new Set(ALL_LINKS.flatMap((l) => [l.source, l.target])),
);

// Nivo Sankey data format: nodes with `id` + `nodeColor`, links with string source/target.
export const SANKEY_NODES = nodeIds.map((id) => ({
	id,
	nodeColor: NODE_COLORS[id] ?? "#94A3B8",
}));

export const SANKEY_LINKS = ALL_LINKS;

// Donut data
export const DONUT_DATA = [
	{ name: "TTH", value: 210, color: "#1e3a8a" },
	{ name: "KDL", value: 90, color: "#93c5fd" },
];

// Horizontal bar chart
export const BAR_DATA = [
	{ code: "PT03", value: 68 },
	{ code: "PT7B", value: 40 },
	{ code: "PT02", value: 33 },
	{ code: "PT07", value: 31 },
	{ code: "PT05", value: 30 },
	{ code: "PT01", value: 30 },
	{ code: "PT04", value: 27 },
];

export const BAR_COLOR_SCALE = [
	"#1e3a8a",
	"#1d4ed8",
	"#2563eb",
	"#3b82f6",
	"#60a5fa",
	"#93c5fd",
	"#bfdbfe",
];

export const COHORTS = ["Khóa 2021", "Khóa 2022", "Khóa 2023", "Khóa 2024"];
export const YEARS = ["2021-2022", "2022-2023", "2023-2024", "2024-2025"];
export const GPA_RANGES = [
	"gpa<4",
	"gpa>=4_and_<5.5",
	"gpa>=5.5_and_<7",
	"gpa>=7_and_<8.5",
	"gpa>=8.5",
];
