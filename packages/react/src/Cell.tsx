import type { Cell as CellType } from "@nolix2/core";
import { getStyle } from "./helpers";
import type { LifeGameCanvasProps } from "./LifeGameCanvas";
import type { WithDefaults } from "./types";

export interface CellCSSProperties {
	width: number;
	height: number;
	background: string;
	borderWidth?: number | undefined;
	borderStyle?: "solid" | undefined;
	borderColor?: string | undefined;
}

export interface CellProps
	extends Pick<
		WithDefaults<LifeGameCanvasProps>,
		| "cellSize"
		| "hoverColor"
		| "aliveColor"
		| "deadColor"
		| "lineWidth"
		| "strokeColor"
		| "id"
	> {
	cell: CellType;
	isHover: boolean;
	onClick: () => void;
	onMouseEnter: () => void;
}

function CellComponent(props: CellProps) {
	const { id, onClick, onMouseEnter } = props;

	const style = getStyle(props);

	return (
		<button
			type="button"
			style={style}
			id={id}
			onClick={onClick}
			onMouseEnter={onMouseEnter}
		/>
	);
}

// TODO: memo 必要？
export const Cell = CellComponent;
