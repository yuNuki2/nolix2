import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	dts: {
		compilerOptions: {
			composite: false,
		},
	},
	// minify: true,
	splitting: false,
	sourcemap: true,
	clean: true,
});
