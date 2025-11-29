import LifeGame, { type Cell, type LifeGameGenerator } from "@nolix2/core";
import { assertIsCanvasElement, resolveElement, resolveOptions } from "../helper";
import { createLifeGameObserver } from "../store";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
	Renderer,
} from "../types";

export class WebGLRenderer implements Renderer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: WebGLRenderingContext | null;
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
		target: string | HTMLCanvasElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const canvas = resolveElement(target);
		if (!canvas) {
			throw new Error("canvas not found");
		}
		assertIsCanvasElement(canvas);
		this._canvas = canvas;
		this._ctx = canvas.getContext("webgl");

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
		const store = createLifeGameObserver(this._generator);

		this.unsubscribe = store.subscribe(() => this.render(store.cells));
	}

	public mount() {
		this.start();
	}

	public render(universe: Cell[][]) {
		if (!this._ctx) return;

		const program = new WebGLProgram();
		const boardTexture = new WebGLTexture();

		// updateTexture(gl, boardTexture, board);

		this._ctx.useProgram(program);
		this._ctx.bindTexture(this._ctx.TEXTURE_2D, boardTexture);
		this._ctx.drawArrays(this._ctx.TRIANGLES, 0, 6);
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

function getSize(
	canvas: HTMLCanvasElement,
	columns?: number | undefined,
	rows?: number | undefined,
) {
	const ceil = Math.ceil;
	if (rows && columns) {
		const cellSize = Math.min(ceil(canvas.width / rows), ceil(canvas.height / columns));
		return { cellSize, columns, rows };
	}
	if (rows) {
		const cellSize = ceil(canvas.width / rows);
		const columns = ceil(canvas.height / cellSize);
		return { cellSize, columns, rows };
	}
	if (columns) {
		const cellSize = ceil(canvas.height / columns);
		const rows = ceil(canvas.width / cellSize);
		return { cellSize, columns, rows };
	}
	const cellSize = Math.min(ceil(canvas.width / 20), ceil(canvas.height / 20));
	return { cellSize, columns: 20, rows: 20 };
}
