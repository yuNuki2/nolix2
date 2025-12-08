import type { Cell } from "@nolix2/core";
import {
	computeGridSize,
	normalizeLifeGameRendererOptions,
	renderCanvas,
	type LifeGameRendererConfig,
	type LifeGameRendererOptions,
	type Renderer,
} from "@nolix2/renderer";
import { isCanvasElement, resolveElement } from "../../helper";

export class CanvasRenderer implements Renderer {
	#options: LifeGameRendererConfig;

	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: CanvasRenderingContext2D | null;

	constructor(
		container: string | HTMLElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(container);
		if (isCanvasElement(el)) {
			this._canvas = el;
		} else {
			this._canvas = document.createElement("canvas");
			el.appendChild(this._canvas);
		}

		this._ctx = this._canvas.getContext("2d");

		if (!this._ctx) {
			throw new Error("2D context not supported");
		}

		const normalizedOptions = normalizeLifeGameRendererOptions(options);

		this._canvas.width = normalizedOptions.width ?? window.innerWidth;
		this._canvas.height = normalizedOptions.height ?? window.innerHeight;

		const size = computeGridSize(this._canvas, options);

		this.#options = { ...normalizedOptions, ...size };
	}

	get options() {
		return this.#options;
	}

	public update(value: LifeGameRendererOptions) {
		this.#options = normalizeLifeGameRendererOptions(this.#options, value);
	}

	public mount() {
		// this.start();
	}

	public render(universe: Cell[][]) {
		renderCanvas(this._ctx, universe, this.#options);
	}

	public unmount() {
		console.log("unmount");
		// this.unsubscribe();
		this._canvas.remove();
	}
}
