import type { Cell } from "@nolix2/core";
import {
	getSize,
	isSVGElement,
	normalizeObject,
	resolveElement,
	resolveOptions,
} from "../../helper";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
	Renderer,
} from "../../types";

export class SVGRenderer implements Renderer {
	private readonly _svg: SVGSVGElement;
	private _options: LifeGameRendererOptionsWithDefaults;

	private readonly _cellSize: number;
	private readonly _columns: number;
	private readonly _rows: number;

	constructor(
		target: string | HTMLElement | SVGSVGElement | null,
		options: LifeGameRendererOptions = {},
	) {
		const el = resolveElement(target);
		if (isSVGElement(el)) {
			this._svg = el;
		} else {
			const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			el.appendChild(svg);
			this._svg = svg;
		}

		this._options = resolveOptions(options);

		const { cellSize, columns, rows } = getSize(
			this._svg,
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

	public render(universe: Cell[][]) {}

	public unmount() {
		this._svg.remove();
	}
}
