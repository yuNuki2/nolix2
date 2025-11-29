import { DEFAULT } from "./constants";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
} from "./types";

export function assertIsCanvasElement(
	value: unknown,
): asserts value is HTMLCanvasElement {
	const isCanvasElement = value instanceof HTMLCanvasElement;
	if (!isCanvasElement) {
		throw new Error();
	}
}

export function assertIsHTMLElement(value: unknown): asserts value is HTMLElement {
	const isHTMLElement = value instanceof HTMLElement;
	if (!isHTMLElement) {
		throw new Error();
	}
}

export function assertIsSVGElement(value: unknown): asserts value is SVGSVGElement {
	const isSVGElement = value instanceof SVGSVGElement;
	if (!isSVGElement) {
		throw new Error();
	}
}

export function noop() {}

export function resolveElement(target: string | Element | null): Element | null {
	return typeof target === "string" ? document.querySelector(target) : target;
}

export function resolveOptions(
	options: LifeGameRendererOptions,
): LifeGameRendererOptionsWithDefaults {
	return Object.assign({}, DEFAULT, options);
}

export function getSize(
	el: Element,
	columns?: number | undefined,
	rows?: number | undefined,
) {
	const ceil = Math.ceil;
	const width = el instanceof HTMLCanvasElement ? el.width : el.clientWidth;
	const height = el instanceof HTMLCanvasElement ? el.height : el.clientHeight;
	if (rows && columns) {
		const cellSize = Math.min(ceil(width / rows), ceil(height / columns));
		return { cellSize, columns, rows };
	}
	if (rows) {
		const cellSize = ceil(width / rows);
		const columns = ceil(height / cellSize);
		return { cellSize, columns, rows };
	}
	if (columns) {
		const cellSize = ceil(height / columns);
		const rows = ceil(width / cellSize);
		return { cellSize, columns, rows };
	}
	const cellSize = Math.min(ceil(width / 20), ceil(height / 20));
	return { cellSize, columns: 20, rows: 20 };
}
