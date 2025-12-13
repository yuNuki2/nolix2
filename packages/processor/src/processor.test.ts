import { createLifeGame } from "@noli2/core";
import { describe, expect, it, vi } from "vitest";
import { createLifeGameProcessor } from "./processor";

describe("processor", () => {
	vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => {
		return setTimeout(() => cb(performance.now()), 16);
	});
	vi.stubGlobal("cancelAnimationFrame", (id: number) => {
		clearTimeout(id);
	});
	it("success", () => {
		const core = createLifeGame([10, 20]);
		const processor = createLifeGameProcessor(core);
		const cells = processor.get();
		expect(cells.flat()).toHaveLength(200);
	});
	it("pricessing", () => {
		const core = createLifeGame([10, 20]);
		const processor = createLifeGameProcessor(core);
		expect(processor.isProcessing).toBeFalsy();
		processor.start();
		expect(processor.isProcessing).toBeTruthy();
		processor.stop();
		expect(processor.isProcessing).toBeFalsy();
	});
	it("subscribe", () => {
		const core = createLifeGame([10, 20]);
		const processor = createLifeGameProcessor(core);
		let universe = [];
		processor.subscribe((value) => {
			universe = value;
		});
	});
});
