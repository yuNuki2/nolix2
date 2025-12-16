import { defineConfig } from "tsup";

export default defineConfig({
	entry: {
		index: "src/index.ts",
		worker: "src/worker.ts",
	},
	outDir: "dist",
	format: ["esm", "cjs"],
	dts: {
		compilerOptions: {
			composite: false,
		},
	},
	splitting: false,
	sourcemap: true,
	clean: true,
	treeshake: true,
});
