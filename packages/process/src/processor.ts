import type { Cell, LifeGame, Size } from "@nolix2/core";
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

	function notify() {
		listeners.forEach((listener) => void listener(cells));
	}

	function next(timestamp?: DOMHighResTimeStamp) {
		const result = lifegame.next();
		cells = result.value.cells;
		notify();
		config.onNext?.({ ...result.value, timestamp });
		return result;
	}

	function prev() {
		const result = lifegame.prev();
		cells = result.value.cells;
		notify();
		config.onPrev?.(result.value);
		return result;
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

	function setCell(x: number, y: number, cell: Cell) {
		cells = lifegame.setCell(x, y, cell);
		notify();
	}

	function update(value: LifeGameProcessorerOptions & { size?: Size }) {
		const { size, ...rest } = value;
		if (size) lifegame.update(size);
		config = normalizeLifeGameProcessorOptions(config, rest);
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
		setCell,
		update,
	};
}

export default class LifeGameProcessorImpl {
	private constructor() {}
	static create(...args: Parameters<typeof createLifeGameProcessor>) {
		return createLifeGameProcessor(...args);
	}
}
