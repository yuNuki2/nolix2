// import { assertIsCanvasElement, assertIsHTMLElement, assertIsSVGElement } from "./helper";
// import type { LifeGameRendererOptions, RenderType } from "./types";

// export function renderer(
// 	type: "canvas",
// 	target: HTMLCanvasElement,
// 	options?: LifeGameRendererOptions,
// ): Renderer<HTMLCanvasElement>;
// export function renderer(
// 	type: "dom",
// 	target: HTMLElement,
// 	options?: LifeGameRendererOptions,
// ): Renderer<HTMLElement>;
// export function renderer(
// 	type: "svg",
// 	target: SVGSVGElement,
// 	options?: LifeGameRendererOptions,
// ): Renderer<SVGSVGElement>;
// export function renderer(
// 	type: "webgl",
// 	target: HTMLCanvasElement,
// 	options?: LifeGameRendererOptions,
// ): Renderer<HTMLCanvasElement>;
// export function renderer(
// 	type: RenderType,
// 	target: HTMLElement | SVGSVGElement | HTMLCanvasElement,
// 	options: LifeGameRendererOptions = {},
// ): Renderer {
// 	const store = lifeGameStore([100, 100], options);
// 	switch (type) {
// 		case "canvas": {
// 			assertIsCanvasElement(target);
// 			return canvasRenderer(target, options);
// 		}
// 		case "dom": {
// 			assertIsHTMLElement(target);
// 			return domRenderer(target, options);
// 		}
// 		case "svg": {
// 			assertIsSVGElement(target);
// 			return svgRenderer(target, options);
// 		}
// 		case "webgl": {
// 			assertIsCanvasElement(target);
// 			return webGLRenderer(target, options);
// 		}
// 	}
// }
