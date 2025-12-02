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

export class WebGLRenderer implements Renderer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: WebGLRenderingContext | null;
	private _options: LifeGameRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;

	constructor(
		target: string | HTMLCanvasElement | null,
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
		this._ctx = this._canvas.getContext("webgl");

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

	public mount() {}

	public render(universe: Cell[][]) {
		if (!this._ctx) return;

		const program = new WebGLProgram();
		const boardTexture = new WebGLTexture();

		// updateTexture(gl, boardTexture, board);

		this._ctx.useProgram(program);
		this._ctx.bindTexture(this._ctx.TEXTURE_2D, boardTexture);
		this._ctx.drawArrays(this._ctx.TRIANGLES, 0, 6);
	}

	public unmount() {
		this._canvas.remove();
	}
}
