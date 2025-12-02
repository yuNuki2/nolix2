import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "index.ts",
		"canvas/index": "src/renderers/canvas/index.ts",
		"custom/index": "src/renderers/custom/index.ts",
		"dom/index": "src/renderers/canvas/index.ts",
		"svg/index": "src/renderers/canvas/index.ts",
		"webgl/index": "src/renderers/canvas/index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	dts: true,
	// minify: true,
	splitting: false,
	sourcemap: true,
	clean: true,
});
