export function getCanvasPoint(
	e: MouseEvent,
	canvas: HTMLCanvasElement,
	devicePixelRatio: number,
) {
	const rect = canvas.getBoundingClientRect();
	const dpr = devicePixelRatio || window.devicePixelRatio || 1;

	const x = (e.clientX - rect.left) * dpr;
	const y = (e.clientY - rect.top) * dpr;

	return { x, y };
}
