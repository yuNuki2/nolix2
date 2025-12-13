import type { Cell } from "@noli2/core";
import {
	computeGridSize,
	normalizeLifeGameRendererOptions,
	type LifeGameRendererConfig,
	type LifeGameRendererOptions,
	type Renderer,
} from "@noli2/renderer";
import { isCanvasElement, isHTMLElement, resolveElement } from "../../helpers";

export class DOMRenderer implements Renderer {
	private readonly container: HTMLElement;
	private readonly cells: HTMLElement[][] = [];
	private _options: LifeGameRendererConfig;

	constructor(
		container: string | HTMLElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(container);
		if (!isHTMLElement(el) || isCanvasElement(el)) {
			throw new Error("target is invalid element");
		}

		this.container = el;

		const normalizedOptions = normalizeLifeGameRendererOptions(options);

		const size = computeGridSize(this.container, options);

		this._options = { ...normalizedOptions, ...size };
	}

	get options() {
		return this._options;
	}

	public update(value: LifeGameRendererOptions) {
		this._options = normalizeLifeGameRendererOptions(this._options, value);
	}

	public mount() {
		this.container.innerHTML = ""; // 初期化

		for (let i = 0; i < this._options.rows; i++) {
			const rowEl = document.createElement("div");
			rowEl.style.display = "flex";

			const cellRow: HTMLElement[] = [];

			for (let j = 0; j < this._options.columns; j++) {
				const cellEl = document.createElement("div");
				cellEl.style.width = `${this._options.cellSize}px`;
				cellEl.style.height = `${this._options.cellSize}px`;
				cellEl.style.boxSizing = "border-box";
				cellEl.style.border = "1px solid #ccc";
				cellEl.style.backgroundColor = i
					? this._options.aliveColor
					: this._options.deadColor;

				rowEl.appendChild(cellEl);
				cellRow.push(cellEl);
			}

			this.container.appendChild(rowEl);
			this.cells.push(cellRow);
		}
	}

	public render(universe: Cell[][]) {
		for (let y = 0; y < universe.length; y++) {
			for (let x = 0; x < (universe?.[y]?.length ?? 0); x++) {
				const cellEl = this.cells?.[y]?.[x];
				const isAlive = !!universe[y]?.[x];
				const currentColor = cellEl?.style.backgroundColor;
				const targetColor = isAlive ? this._options.aliveColor : this._options.deadColor;

				if (cellEl && currentColor !== targetColor) {
					cellEl.style.backgroundColor = targetColor;
				}
			}
		}
	}

	public unmount() {
		this.container.innerHTML = "";
		this.cells.splice(0);
	}
}
