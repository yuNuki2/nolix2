import type { Cell, LifeGameRendererConfig } from "./types";

export function renderCanvas(
	ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null,
	universe: Cell[][],
	config: LifeGameRendererConfig,
) {
	if (!ctx) return;
	ctx.clearRect(0, 0, config.width, config.height);
	for (let y = 0; y < config.rows; y++) {
		for (let x = 0; x < config.columns; x++) {
			const cell = universe[y]?.[x];
			if (cell) {
				ctx.fillStyle = config.aliveColor;
			} else {
				ctx.fillStyle = config.deadColor;
			}

			if (config.strokeColor) {
				ctx.strokeStyle = config.strokeColor;
			}
			ctx.lineWidth = config.lineWidth ?? 1;

			const { cellSize } = config;

			const rectArgs = [x * cellSize, y * cellSize, cellSize, cellSize] as const;

			ctx.fillRect(...rectArgs);
			ctx.strokeRect(...rectArgs);
		}
	}
}
