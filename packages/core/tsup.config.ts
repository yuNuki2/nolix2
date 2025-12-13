import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs", "iife"],
	globalName: "LifeGame",
	dts: true,
	splitting: false,
	// minify: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
});
