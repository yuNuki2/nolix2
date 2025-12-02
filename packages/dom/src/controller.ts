import LifeGame, { type Cell } from "@nolix2/core";
import { normalizeObject } from "./helper";
import { createLifeGameObserver, type Store } from "./store";
import type {
	LifeGameControllerOptions,
	LifeGameControllerOptionsWithDefaults,
	Renderer,
} from "./types";

export class LifeGameController {
	private _options: LifeGameControllerOptionsWithDefaults;
	private readonly _renderer: Renderer;

	private _lastTimestamp: number | null = null;
	private _processing = false;
	private _animationFrame: number | null = null;

	private readonly _store: Store;
	private readonly _unsubscribe: () => void;

	private constructor(renderer: Renderer, options: LifeGameControllerOptions = {}) {
		this._renderer = renderer;
		this._options = Object.assign({ interval: 200 }, normalizeObject(options));
		console.log(this._options, this._renderer.options, options);
		const columns = this._renderer.options?.columns ?? 20;
		const rows = this._renderer.options?.rows ?? 20;

		// TODO: rows, columns
		const generator = LifeGame.generate([columns, rows], this._renderer.options);
		this._store = createLifeGameObserver(generator);

		this._unsubscribe = this.subscribe(this._renderer.render.bind(this._renderer));
	}

	// static create(
	// 	target: string | HTMLCanvasElement | null,
	// 	options: LifeGameControllerOptions & LifeGameRendererOptions = {},
	// ) {
	// 	const renderer = new CanvasRenderer(target, options);
	// 	return new LifeGameController(renderer, options);
	// }

	static withRenderer(renderer: Renderer, options: LifeGameControllerOptions = {}) {
		return new LifeGameController(renderer, options);
	}

	get options() {
		return this._options;
	}

	get cells() {
		return this._store.cells;
	}

	get renderer() {
		return this._renderer;
	}

	private loop(timestamp: DOMHighResTimeStamp) {
		if (
			!this._lastTimestamp ||
			timestamp - this._lastTimestamp >= this._options.interval
		) {
			const done = this.next(timestamp);

			console.log({ done });

			if (done) return stop();
			this._lastTimestamp = timestamp;
		}

		this._animationFrame = requestAnimationFrame(this.loop.bind(this));
	}

	public subscribe(callback: (cells: Cell[][]) => void) {
		return this._store.subscribe(callback);
	}

	public next(timestamp?: DOMHighResTimeStamp): boolean | undefined {
		const { done } = this._store.next();
		return done;
	}

	public prev() {}

	public start() {
		this._renderer.mount();
		if (this._processing) return;
		this._animationFrame = requestAnimationFrame(this.loop.bind(this));
		this._processing = true;
		// dispatch();
	}

	public stop() {
		console.log("stop", this._processing, this._animationFrame);
		if (!this._processing || this._animationFrame === null) return;
		cancelAnimationFrame(this._animationFrame);
		this._processing = false;
		this._animationFrame = null;
		// dispatch();
	}

	public dispose() {
		this._unsubscribe();
		this._renderer.unmount();
	}
}
