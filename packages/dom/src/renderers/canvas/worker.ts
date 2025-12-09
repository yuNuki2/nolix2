import type { Cell } from "@nolix2/core";
import { renderCanvas } from "@nolix2/renderer";

self.onmessage = (e) => {
	console.log({ e });
	const canvas: OffscreenCanvas = e.data.canvas;
	const universe: Cell[][] = e.data.universe;
	const config = e.data.config;

	const ctx = canvas.getContext("2d");
	renderCanvas(ctx, universe, config);
};
