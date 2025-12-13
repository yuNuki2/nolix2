import type { Cell } from "@noli2/core";
import {
	computeGridSize,
	normalizeLifeGameRendererOptions,
	type LifeGameRendererConfig,
	type LifeGameRendererOptions,
	type Renderer,
} from "@noli2/renderer";
import { isSVGElement, resolveElement } from "../../helpers";

export class SVGRenderer implements Renderer {
	private readonly _svg: SVGSVGElement;
	private _options: LifeGameRendererConfig;

	private readonly _cells: SVGRectElement[][];

	constructor(
		container: string | HTMLElement | SVGSVGElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(container);
		if (isSVGElement(el)) {
			this._svg = el;
		} else {
			this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			el.appendChild(this._svg);
		}

		this._svg.setAttribute("width", String(options.width ?? window.innerWidth));
		this._svg.setAttribute("height", String(options.height ?? window.innerHeight));
		this._svg.style.display = "block";

		const normalizedOptions = normalizeLifeGameRendererOptions(options);

		const size = computeGridSize(this._svg, options);

		this._options = { ...normalizedOptions, ...size };

		this._cells = [];

		for (let y = 0; y < this._options.rows; y++) {
			const row: SVGRectElement[] = [];

			for (let x = 0; x < this._options.columns; x++) {
				const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");

				rect.setAttribute("x", String(x * this._options.cellSize));
				rect.setAttribute("y", String(y * this._options.cellSize));
				rect.setAttribute("width", String(this._options.cellSize));
				rect.setAttribute("height", String(this._options.cellSize));
				rect.setAttribute("fill", "#fff");
				if (this._options.strokeColor) {
					rect.setAttribute("stroke", this._options.strokeColor);
				}

				this._svg.appendChild(rect);
				row.push(rect);
			}

			this._cells.push(row);
		}
	}

	get options() {
		return this._options;
	}

	public update(value: LifeGameRendererOptions) {
		this._options = normalizeLifeGameRendererOptions(this._options, value);
	}

	public mount() {}

	public render(universe: Cell[][]) {
		for (let y = 0; y < this._options.rows; y++) {
			for (let x = 0; x < this._options.columns; x++) {
				const alive = universe[y]?.[x] === 1;
				this._cells[y]?.[x]?.setAttribute(
					"fill",
					alive ? this._options.aliveColor : this._options.deadColor,
				);
			}
		}
	}

	public unmount() {
		this._svg.remove();
	}
}
