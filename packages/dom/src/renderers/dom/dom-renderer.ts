import type { Cell } from "@nolix2/core";
import {
	getSize,
	isCanvasElement,
	isHTMLElement,
	normalizeObject,
	resolveElement,
	resolveOptions,
} from "../../helper";
import type {
	LifeGameDOMRendererOptions,
	LifeGameDOMRendererOptionsWithDefaults,
	LifeGameRendererOptions,
	Renderer,
} from "../../types";

export class DOMRenderer implements Renderer {
	private readonly container: HTMLElement;
	private readonly cells: HTMLElement[][] = [];
	private _options: LifeGameDOMRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;

	constructor(
		container: string | HTMLElement | null,
		options: LifeGameDOMRendererOptions = {},
	) {
		const el = resolveElement(container);
		if (!isHTMLElement(el) || isCanvasElement(el)) {
			throw new Error("target is invalid element");
		}

		this.container = el;

		this._options = resolveOptions(options);

		const { cellSize, columns, rows } = getSize(
			this.container,
			this._options.columns,
			this._options.rows,
		);

		this._cellSize = 14;
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
		this.container.innerHTML = ""; // 初期化

		for (let i = 0; i < this._rows; i++) {
			const rowEl = document.createElement(this._options.cellEl ?? "div");
			rowEl.style.display = "flex";

			const cellRow: HTMLElement[] = [];

			for (let j = 0; j < this._columns; j++) {
				const cellEl = document.createElement("div");
				cellEl.style.width = `${this._cellSize}px`;
				cellEl.style.height = `${this._cellSize}px`;
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
