import LifeGame, { type Cell, type LifeGameGenerator } from "@nolix2/core";
import {
	assertIsCanvasElement,
	getSize,
	resolveElement,
	resolveOptions,
} from "../helper";
import { createLifeGameObserver, type Store } from "../store";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
	Renderer,
} from "../types";

export class CanvasRenderer implements Renderer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: CanvasRenderingContext2D | null;
	private _options: LifeGameRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;
	private _lastTimestamp: number | null = null;
	private _processing = false;
	private _animationFrame: number | null = null;

	private readonly _generator: LifeGameGenerator;
	private readonly _store: Store;
	private readonly unsubscribe: () => void;

	constructor(
		target: string | HTMLCanvasElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const canvas = resolveElement(target);
		if (!canvas) {
			throw new Error("canvas not found");
		}
		assertIsCanvasElement(canvas);
		this._canvas = canvas;
		this._ctx = canvas.getContext("2d");

		if (!this._ctx) {
			throw new Error("2D context not supported");
		}

		this._options = resolveOptions(options);

		canvas.width = this._options.width;
		canvas.height = this._options.height;

		const { cellSize, columns, rows } = getSize(
			canvas,
			this._options.columns,
			this._options.rows,
		);

		this._cellSize = cellSize;
		this._columns = columns;
		this._rows = rows;

		this._generator = LifeGame.generate(this._options, this._options);
		this._store = createLifeGameObserver(this._generator);

		this.unsubscribe = this._store.subscribe(() => this.render(this._store.cells));
	}

	get store() {
		return this._store;
	}

	public mount() {
		this.start();
	}

	public render(universe: Cell[][]) {
		if (!this._ctx) return;
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		for (let y = 0; y < this._rows; y++) {
			for (let x = 0; x < this._columns; x++) {
				const cell = universe[x]?.[y];
				if (cell) {
					this._ctx.fillStyle = this._options.aliveColor;
				} else {
					this._ctx.fillStyle = this._options.deadColor;
				}

				this._ctx.strokeStyle = this._options.strokeColor;

				const rectArgs = [
					x * this._cellSize,
					y * this._cellSize,
					this._cellSize,
					this._cellSize,
				] as const;

				this._ctx.fillRect(...rectArgs);
				this._ctx.strokeRect(...rectArgs);
			}
		}
	}

	private loop(timestamp: DOMHighResTimeStamp) {
		if (
			!this._lastTimestamp ||
			timestamp - this._lastTimestamp >= this._options.interval
		) {
			const done = this._next(timestamp);

			console.log({ done });

			if (done) return stop();
			this._lastTimestamp = timestamp;
		}

		this._animationFrame = requestAnimationFrame(this.loop.bind(this));
	}

	private _next(timestamp?: DOMHighResTimeStamp): boolean | Promise<boolean> {
		const { done, value } = this._generator.next();
		if (done) return true;
		this.render(value);
		this._options.onRender?.(timestamp);
		return false;
	}

	public start() {
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

	public unmount() {
		this.unsubscribe();
		this._canvas.remove();
	}
}
