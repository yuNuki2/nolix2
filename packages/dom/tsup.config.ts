import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "index.ts",
		"canvas/index": "src/renderers/canvas/index.ts",
		"custom/index": "src/renderers/custom/index.ts",
		"dom/index": "src/renderers/dom/index.ts",
		"svg/index": "src/renderers/svg/index.ts",
		"webgl/index": "src/renderers/webgl/index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	dts: true,
	// minify: true,
	splitting: false,
	sourcemap: true,
	clean: true,
});
