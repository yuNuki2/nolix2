export function point2Cell(
	px: number,
	py: number,
	columns: number,
	rows: number,
	width: number,
	height: number,
) {
	const cellWidth = width / columns;
	const cellHeight = height / rows;

	const x = Math.floor(px / cellWidth);
	const y = Math.floor(py / cellHeight);

	return { x, y };
}
