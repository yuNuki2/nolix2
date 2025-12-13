import type { Cell } from "@noli2/core";
import {
	computeGridSize,
	normalizeLifeGameRendererOptions,
	renderCanvas,
	type LifeGameCanvasRendererConfig,
	type LifeGameCanvasRendererOptions,
	type LifeGameRendererOptions,
	type Renderer,
} from "@noli2/renderer";
import { isCanvasElement, resolveElement } from "../../helper";

export class CanvasRenderer implements Renderer {
	#options: LifeGameCanvasRendererConfig;

	private readonly _canvas: HTMLCanvasElement;
	private readonly _ctx: CanvasRenderingContext2D | null;

	private readonly _worker: Worker | undefined;
	private readonly _channel: MessageChannel | undefined;

	constructor(
		container: string | HTMLElement | null,
		options: LifeGameCanvasRendererOptions = {},
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

		if (options.useWorker) {
			const scriptURL = new URL("./worker.js", import.meta.url);
			this._worker = new Worker(scriptURL);
			this._channel = new MessageChannel();
			const offscreen = this._canvas.transferControlToOffscreen();
			this._worker.postMessage({ canvas: offscreen, port: this._channel.port1 });
		}

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
		if (this.#options.useWorker) {
			this._worker?.postMessage({ universe, config: this.#options });
		} else {
			renderCanvas(this._ctx, universe, this.#options);
		}
	}

	public unmount() {
		console.log("unmount");
		// this.unsubscribe();
		this._canvas.remove();
	}
}
