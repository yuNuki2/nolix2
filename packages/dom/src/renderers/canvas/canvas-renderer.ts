import type { Cell } from "@nolix2/core";
import {
	getSize,
	isCanvasElement,
	normalizeObject,
	resolveElement,
	resolveOptions,
} from "../../helper";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
	Renderer,
} from "../../types";

export class CanvasRenderer implements Renderer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: CanvasRenderingContext2D | null;
	private _options: LifeGameRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;

	constructor(
		target: string | HTMLElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(target);
		if (isCanvasElement(el)) {
			this._canvas = el;
		} else {
			const canvas = document.createElement("canvas");
			el.appendChild(canvas);
			this._canvas = canvas;
		}

		this._ctx = this._canvas.getContext("2d");

		if (!this._ctx) {
			throw new Error("2D context not supported");
		}

		this._options = resolveOptions(options);

		this._canvas.width = this._options.width;
		this._canvas.height = this._options.height;

		const { cellSize, columns, rows } = getSize(
			this._canvas,
			this._options.columns,
			this._options.rows,
		);

		console.log({ cellSize });

		this._cellSize = cellSize;
		this._columns = columns;
		this._rows = rows;
	}

	get options() {
		return this._options;
	}

	public update(value: Partial<LifeGameRendererOptions>) {
		this._options = Object.assign({}, this._options, normalizeObject(value));
	}

	public mount() {
		// this.start();
	}

	public render(universe: Cell[][]) {
		console.log("render", !this._ctx);
		if (!this._ctx) return;
		this._ctx.clearRect(0, 0, this._canvas.width, this._canvas.height);
		for (let y = 0; y < this._rows; y++) {
			for (let x = 0; x < this._columns; x++) {
				const cell = universe[y]?.[x];
				if (cell) {
					this._ctx.fillStyle = this._options.aliveColor;
				} else {
					this._ctx.fillStyle = this._options.deadColor;
				}

				this._ctx.strokeStyle = this._options.strokeColor;

				const cellSize = this._cellSize;

				const rectArgs = [x * cellSize, y * cellSize, cellSize, cellSize] as const;

				this._ctx.fillRect(...rectArgs);
				this._ctx.strokeRect(...rectArgs);
			}
		}
		this._options.onRender?.();
	}

	public unmount() {
		console.log("unmount");
		// this.unsubscribe();
		this._canvas.remove();
	}
}
