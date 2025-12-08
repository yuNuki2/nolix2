import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	dts: true,
	splitting: false,
	minify: true,
	sourcemap: true,
	clean: true,
	treeshake: true,
});
