import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	banner: {
		js: `"use client"`,
	},
	dts: true,
	splitting: false,
	sourcemap: true,
	clean: true,
	external: ["react", "react/jsx-runtime"],
});
