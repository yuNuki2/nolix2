import type { Cell, LifeGame } from "@nolix2/core";
import { normalizeLifeGameProcessorOptions } from "./helper";
import type {
	LifeGameProcessorerOptions,
	LifeGameProcessorOptionsWithDefaults,
} from "./types";

export class LifeGameProcessor {
	#options: LifeGameProcessorOptionsWithDefaults;

	private _cells: Cell[][] = [];
	private _isProcessing: boolean = false;
	private _lastTimestamp: number | null = null;
	private _animationFrame: number | null = null;

	private readonly _listeners = new Set<(cells: Cell[][]) => void>();
	private readonly _lifegame: LifeGame;

	constructor(lifegame: LifeGame, options: LifeGameProcessorerOptions = {}) {
		this._lifegame = lifegame;
		this.#options = normalizeLifeGameProcessorOptions(options);
	}

	public subscribe(callback: (cells: Cell[][]) => void): () => void {
		this._listeners.add(callback);
		return () => {
			this._listeners.delete(callback);
		};
	}

	public get() {
		return this._cells;
	}

	public next(timestamp?: DOMHighResTimeStamp) {
		const result = this._lifegame.next();
		this._cells = result.value.cells;
		for (const listener of this._listeners) {
			listener(this._cells);
		}
		this.#options.onNext?.(result.value);
		return result;
	}

	public prev() {
		this.#options.onPrev?.();
	}

	public start() {
		if (this._isProcessing) return;
		this._animationFrame = requestAnimationFrame(this.loop.bind(this));
		this._isProcessing = true;
		this.#options.onStart?.();
	}

	public stop() {
		console.log("stop", this._isProcessing, this._animationFrame, this._listeners);
		if (!this._isProcessing || this._animationFrame == null) return;
		cancelAnimationFrame(this._animationFrame);
		this._isProcessing = false;
		this._animationFrame = null;
		this.#options.onStop?.();
	}

	public update(value: LifeGameProcessorerOptions) {
		this.#options = normalizeLifeGameProcessorOptions(this.#options, value);
	}

	private loop(timestamp: DOMHighResTimeStamp) {
		if (
			!this._lastTimestamp ||
			timestamp - this._lastTimestamp >= this.#options.interval
		) {
			const result = this.next(timestamp);

			// console.log({ done: result.done });

			if (result.done) return stop();
			this._lastTimestamp = timestamp;
		}

		this._animationFrame = requestAnimationFrame(this.loop.bind(this));
		// console.log("last:", this._animationFrame);
	}
}
