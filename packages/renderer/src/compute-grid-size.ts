import type { GridSize } from "./types";

export function computeGridSize(
	el: Element,
	size: {
		columns?: number | undefined;
		rows?: number | undefined;
	} = {},
): GridSize {
	const width =
		el instanceof HTMLCanvasElement ? el.width : el.getBoundingClientRect().width;
	const height =
		el instanceof HTMLCanvasElement ? el.height : el.getBoundingClientRect().height;

	let cellSize = 0;
	let columns = size.columns;
	let rows = size.rows;
	if (rows !== undefined && columns !== undefined) {
		cellSize = Math.min(width / rows, height / columns);
	} else if (rows !== undefined) {
		cellSize = height / rows;
		columns = Math.ceil(width / cellSize);
	} else if (columns !== undefined) {
		cellSize = width / columns;
		rows = Math.ceil(height / cellSize);
	} else if (width > height) {
		columns = 32;
		cellSize = width / columns;
		rows = Math.ceil(height / cellSize);
	} else {
		rows = 32;
		cellSize = height / rows;
		columns = Math.ceil(width / cellSize);
	}
	return { cellSize, columns, rows };
}
