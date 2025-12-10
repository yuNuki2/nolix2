import type { LifeGameCanvasRendererConfig } from "@nolix2/renderer";
import { pick } from "./helper";

export function getWorker() {
	const scriptURL = new URL("./worker.js", import.meta.url);
	return new Worker(scriptURL, { type: "module" });
}

export function initCanvas(worker: Worker, canvas: OffscreenCanvas, port: MessagePort) {
	worker.postMessage({ canvas, port }, [canvas, port]);
}

export function updateCanvasConfig(worker: Worker, config: LifeGameCanvasRendererConfig) {
	worker.postMessage({
		config: pick(config, [
			"width",
			"height",
			"rows",
			"columns",
			"aliveColor",
			"deadColor",
			"strokeColor",
			"cellSize",
			"mode",
			"devicePixelRatio",
		]),
	});
}
