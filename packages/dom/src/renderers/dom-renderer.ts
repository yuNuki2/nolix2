import LifeGame, { type Cell, type LifeGameGenerator } from "@nolix2/core";
import { assertIsHTMLElement, getSize, resolveElement, resolveOptions } from "../helper";
import { createLifeGameObserver } from "../store";
import type {
	LifeGameDOMRendererOptions,
	LifeGameDOMRendererOptionsWithDefaults,
	Renderer,
} from "../types";

export class DOMRenderer implements Renderer {
	private readonly container: HTMLElement;
	private readonly cells: HTMLElement[][] = [];
	private _options: LifeGameDOMRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;
	private _lastTimestamp: number | null = null;
	private _processing = false;
	private _animationFrame: number | null = null;

	private readonly _generator: LifeGameGenerator;
	private readonly unsubscribe: () => void;

	constructor(
		container: string | HTMLElement | null,
		options: LifeGameDOMRendererOptions = {},
	) {
		const el = resolveElement(container);
		if (!el) {
			throw new Error("canvas not found");
		}
		assertIsHTMLElement(el);

		this.container = el;

		this._options = resolveOptions(options);

		const { cellSize, columns, rows } = getSize(
			this.container,
			this._options.columns,
			this._options.rows,
		);

		this._cellSize = cellSize;
		this._columns = columns;
		this._rows = rows;

		this._generator = LifeGame.generate([columns, rows], this._options);
		const store = createLifeGameObserver(this._generator);

		this.unsubscribe = store.subscribe(() => this.render(store.cells));
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
