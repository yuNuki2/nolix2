import type { Cell } from "@nolix2/core";
import { renderCanvas, type LifeGameCanvasRendererConfig } from "@nolix2/renderer";

let canvas: OffscreenCanvas | undefined;
let port: MessagePort | undefined;

self.onmessage = (e) => {
	let universe: Cell[][] | undefined;
	let config: LifeGameCanvasRendererConfig | undefined;

	if (e.data.canvas) {
		canvas = e.data.canvas;
	}

	if (e.data.port) {
		port = e.data.port;
	}

	if (e.data.universe) {
		universe = e.data.universe;
	}

	if (e.data.config) {
		config = e.data.config;
	}

	const ctx = canvas?.getContext("2d");
	if (ctx && universe && config) {
		renderCanvas(ctx, universe, config);
	}
	if (port) {
		port.postMessage("");
	}
};
