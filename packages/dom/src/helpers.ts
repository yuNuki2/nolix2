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
