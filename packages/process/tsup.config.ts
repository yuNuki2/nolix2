import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	dts: true,
	// minify: true,
	splitting: false,
	sourcemap: true,
	clean: true,
});
