export type {
	LifeGameCanvasRendererConfig,
	LifeGameCanvasRendererOptions,
	LifeGameRendererConfig,
	LifeGameRendererOptions,
	ProcessMode,
	Renderer,
} from "./types";

export { renderCanvas } from "./canvas";
export { computeGridSize } from "./compute-grid-size";
export { getCanvasPoint } from "./get-canvas-point";
export { normalizeLifeGameRendererOptions } from "./options";
export { point2Cell } from "./point2cell";
