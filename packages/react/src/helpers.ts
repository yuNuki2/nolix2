import type { CellCSSProperties, CellProps } from "./Cell";

// biome-ignore lint/suspicious/noExplicitAny: allow any
export function pick<T extends Record<string, any>, K extends keyof T>(
	obj: T,
	keys: readonly K[],
): Pick<T, K> {
	const result = {} as Pick<T, K>;
	for (const key of keys) {
		result[key] = obj[key];
	}
	return result;
}

export function getStyle(props: CellProps): CellCSSProperties {
	const baseStyle = {
		width: props.cellSize,
		height: props.cellSize,
		background:
			props.hoverColor && props.isHover
				? props.hoverColor
				: props.cell
					? props.aliveColor
					: props.deadColor,
	};
	return props.strokeColor
		? {
				...baseStyle,
				borderWidth: props.lineWidth,
				borderStyle: "solid",
				borderColor: props.strokeColor,
			}
		: baseStyle;
}
