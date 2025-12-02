export const DEFAULT = {
	aliveColor: "#64f0b4",
	deadColor: "#fff",
	strokeColor: "#c8ebeb",
	devicePixelRatio: typeof window !== "undefined" ? window.devicePixelRatio : 1,
	mode: "auto",
	height: typeof window !== "undefined" ? window.innerHeight : 0,
	width: typeof window !== "undefined" ? window.innerWidth : 0,
} as const;
