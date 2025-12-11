import type { Cell, LifeGame } from "@nolix2/core";
import { normalizeLifeGameProcessorOptions } from "./helper";
import type { LifeGameProcessor, LifeGameProcessorerOptions } from "./types";

export function createLifeGameProcessor(
	lifegame: LifeGame,
	options: LifeGameProcessorerOptions = {},
): LifeGameProcessor {
	let config = normalizeLifeGameProcessorOptions(options);
	let cells: Cell[][] = [];
	let isProcessing: boolean = false;
	let lastTimestamp: number | null = null;
	let animationFrame: number | null = null;

	const listeners = new Set<(cells: Cell[][]) => void>();

	function subscribe(callback: (cells: Cell[][]) => void): () => void {
		listeners.add(callback);
		return () => {
			listeners.delete(callback);
		};
	}

	function get() {
		return cells;
	}

	function next(timestamp?: DOMHighResTimeStamp) {
		const result = lifegame.next();
		cells = result.value.cells;
		for (const listener of listeners) {
			listener(cells);
		}
		config.onNext?.(result.value);
		return result;
	}

	function prev() {
		config.onPrev?.();
	}

	function start() {
		if (isProcessing) return;
		animationFrame = requestAnimationFrame(loop);
		isProcessing = true;
		config.onStart?.();
	}

	function stop() {
		if (!isProcessing || animationFrame == null) return;
		cancelAnimationFrame(animationFrame);
		isProcessing = false;
		animationFrame = null;
		config.onStop?.();
	}

	function update(value: LifeGameProcessorerOptions) {
		config = normalizeLifeGameProcessorOptions(config, value);
	}

	const loop = (timestamp: DOMHighResTimeStamp) => {
		if (!lastTimestamp || timestamp - lastTimestamp >= config.interval) {
			const result = next(timestamp);

			if (result.done) return stop();
			lastTimestamp = timestamp;
		}

		animationFrame = requestAnimationFrame(loop);
	};

	return {
		get isProcessing() {
			return isProcessing;
		},
		subscribe,
		get,
		next,
		prev,
		start,
		stop,
		update,
	};
}

export default class {
	private constructor() {}
	static create(...args: Parameters<typeof createLifeGameProcessor>) {
		return createLifeGameProcessor(...args);
	}
}
