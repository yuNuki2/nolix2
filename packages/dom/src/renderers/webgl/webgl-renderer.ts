import type { Cell } from "@nolix2/core";
import {
	getSize,
	normalizeLifeGameRendererOptions,
	type LifeGameRendererConfig,
	type LifeGameRendererOptions,
	type Renderer,
} from "@nolix2/renderer";
import { isCanvasElement, resolveElement } from "../../helper";

export class WebGLRenderer implements Renderer {
	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: WebGLRenderingContext | null;
	private _options: LifeGameRendererConfig;

	constructor(
		container: string | HTMLCanvasElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(container);
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

		const normalizedOptions = normalizeLifeGameRendererOptions(options);

		this._canvas.width = normalizedOptions.width ?? window.innerWidth;
		this._canvas.height = normalizedOptions.height ?? window.innerHeight;

		const config = getSize(this._canvas, options);

		this._options = { ...normalizedOptions, ...config };
	}

	get options() {
		return this._options;
	}

	public update(value: LifeGameRendererOptions) {
		this._options = normalizeLifeGameRendererOptions(this._options, value);
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
