import { createLifeGame, type LifeGameCreateOptions } from "@noli2/core";
import {
	createLifeGameProcessor,
	type LifeGameProcessorerOptions,
} from "@noli2/processor";
import { renderCanvas, type LifeGameRendererConfig } from "@noli2/renderer";

interface LifeGameConfig
	extends LifeGameCreateOptions,
		LifeGameRendererConfig,
		LifeGameProcessorerOptions {}

let canvas: OffscreenCanvas | undefined;
let port: MessagePort | undefined;

self.onmessage = (e) => {
	console.log({ e });
	// let universe: Cell[][] | undefined;
	let config: LifeGameConfig | undefined;

	if (e.data.canvas) {
		canvas = e.data.canvas as OffscreenCanvas;
		const dpr = e.data.config.devicePixelRatio || window.devicePixelRatio || 1;
		const width = e.data.config.width || window.innerWidth;
		const height = e.data.config.height || window.innerHeight;

		canvas.width = width * dpr;
		canvas.height = height * dpr;
	}

	if (e.data.port) {
		port = e.data.port;
	}

	if (e.data.config) {
		config = e.data.config;
	}

	const ctx = canvas?.getContext("2d");
	if (canvas && ctx && config) {
		const { interval, ...rendererOptions } = config;
		const generator = createLifeGame([config.columns, config.rows], rendererOptions);
		const game = createLifeGameProcessor(generator, { interval });

		game.update(config);
		const unsubscribe = game.subscribe((universe) => {
			renderCanvas(ctx, universe, config);
			port?.postMessage("");
		});

		if (config.mode === "auto") {
			game.start();
		}

		if (e.data.type === "cleanup") {
			unsubscribe();
			game.stop();
		}
	}
};
