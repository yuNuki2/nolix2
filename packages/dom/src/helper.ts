import { DEFAULT } from "./constants";
import type {
	LifeGameRendererOptions,
	LifeGameRendererOptionsWithDefaults,
} from "./types";

export function isCanvasElement(value: unknown): value is HTMLCanvasElement {
	return value instanceof HTMLCanvasElement;
}

export function isHTMLElement(value: unknown): value is HTMLElement {
	return value instanceof HTMLElement;
}

export function isSVGElement(value: unknown): value is SVGSVGElement {
	return value instanceof SVGSVGElement;
}

export function noop() {}

export function resolveElement(target: string | Element | null): Element {
	const result = typeof target === "string" ? document.querySelector(target) : target;
	if (result == null) {
		throw new Error("target not found");
	}
	return result;
}

export function normalizeObject<O extends object>(obj: O): O {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined),
	) as O;
}

export function resolveOptions(
	options: LifeGameRendererOptions,
): LifeGameRendererOptionsWithDefaults {
	return Object.assign({}, DEFAULT, normalizeObject(options));
}

export function getSize(
	el: Element,
	columns?: number | undefined,
	rows?: number | undefined,
) {
	const width = el instanceof HTMLCanvasElement ? el.width : el.clientWidth;
	const height = el instanceof HTMLCanvasElement ? el.height : el.clientHeight;
	console.log({ width, height, columns, rows });
	if (rows !== undefined && columns !== undefined) {
		const cellSize = Math.min(width / rows, height / columns);
		return { cellSize, columns, rows };
	}
	if (rows !== undefined) {
		const cellSize = height / rows;
		const columns = Math.ceil(width / cellSize);
		return { cellSize, columns, rows };
	}
	if (columns !== undefined) {
		const cellSize = width / columns;
		const rows = Math.ceil(height / cellSize);
		console.log({ rows });
		return { cellSize, columns, rows };
	}
	if (width > height) {
		const columns = 20;
		const cellSize = width / columns;
		const rows = Math.ceil(height / cellSize);
		return { cellSize, columns, rows };
	} else {
		const rows = 20;
		const cellSize = height / rows;
		const columns = Math.ceil(width / cellSize);
		return { cellSize, columns, rows };
	}
}
