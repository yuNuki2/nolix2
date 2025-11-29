import { CanvasRenderer } from "./src/renderers/canvas-renderer";
import { createCustomRenderer } from "./src/renderers/custom-renderer";
import { DOMRenderer } from "./src/renderers/dom-renderer";
import { SVGRenderer } from "./src/renderers/svg-renderer";
import { WebGLRenderer } from "./src/renderers/webgl-renderer";

export { CanvasRenderer } from "./src/renderers/canvas-renderer";
export { createCustomRenderer } from "./src/renderers/custom-renderer";
export { DOMRenderer } from "./src/renderers/dom-renderer";
export { SVGRenderer } from "./src/renderers/svg-renderer";
export { WebGLRenderer } from "./src/renderers/webgl-renderer";

export type { LifeGameRendererOptions, Renderer, RenderType } from "./src/types";

export default {
	CanvasRenderer,
	DOMRenderer,
	SVGRenderer,
	WebGLRenderer,
	createCustomRenderer,
};
