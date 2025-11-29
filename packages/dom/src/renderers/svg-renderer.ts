import LifeGame, { type Cell, type LifeGameGenerator } from "@nolix2/core";
import { assertIsSVGElement, getSize, resolveElement, resolveOptions } from "../helper";
import { createLifeGameObserver } from "../store";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
	Renderer,
} from "../types";

export class SVGRenderer implements Renderer {
	private readonly _svg: SVGSVGElement;
	private _options: LifeGameRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;
	private _lastTimestamp: number | null = null;
	private _processing = false;
	private _animationFrame: number | null = null;

	private readonly _generator: LifeGameGenerator;
	private readonly unsubscribe: () => void;

	constructor(
		target: string | SVGSVGElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(target);
		if (!el) {
			throw new Error("canvas not found");
		}
		assertIsSVGElement(el);
		this._svg = el;

		this._options = resolveOptions(options);

		const { cellSize, columns, rows } = getSize(
			this._svg,
			this._options.columns,
			this._options.rows,
		);

		this._cellSize = cellSize;
		this._columns = columns;
		this._rows = rows;

		this._generator = LifeGame.generate(this._options, this._options);
		const store = createLifeGameObserver(this._generator);

		this.unsubscribe = store.subscribe(() => this.render(store.cells));
	}

	public mount() {
		this.start();
	}

	public render(universe: Cell[][]) {}

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
	}
}
