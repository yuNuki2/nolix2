import type { Cell as CellType } from "@noli2/core";
import type LifeGameProcessor from "@noli2/process";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
	useSyncExternalStore,
	type ComponentProps,
	type ForwardedRef,
} from "react";
import { Cell, type CellProps } from "./Cell";
import { pick } from "./helpers";
import { useLifeGameConfig } from "./hooks/useLifeGameConfig";
import { useSafeLayoutEffect } from "./hooks/useSafeLayoutEffect";
import type { LifeGameProps } from "./types";

export interface LifeGameDOMProps extends LifeGameProps {
	/**
	 * @default undefined
	 */
	containerProps?: ComponentProps<"div"> | undefined;

	/**
	 * @default Cell component
	 */
	cellEl?: ((props: CellProps) => JSX.Element) | undefined;
}

function LifeGameDOMComponent(
	props: LifeGameDOMProps,
	ref: ForwardedRef<LifeGameProcessor>,
) {
	const el = useRef<HTMLDivElement>(null);

	const [hoveredIndex, setHoveredIndex] = useState<[number, number] | null>(null);

	useSafeLayoutEffect(() => {
		if (!el.current) return;

		const width = props.width || window.innerWidth;
		const height = props.height || window.innerHeight;

		el.current.style.width = `${width}px`;
		el.current.style.height = `${height}px`;
	}, [props]);

	const { normalizedProps, game } = useLifeGameConfig(el, props);

	const universe = useSyncExternalStore(game.subscribe, game.get, game.get);

	useEffect(() => {
		if (normalizedProps.mode === "auto") {
			game.start();
		}

		// return () => {
		// 	game.stop();
		// };
	}, [game, normalizedProps.mode]);

	useImperativeHandle(ref, () => game);

	const handleClick = useCallback(
		(x: number, y: number, cell: CellType) => {
			normalizedProps.onClick?.(x, y);
			if (normalizedProps.editable) {
				game.setCell(x, y, cell);
			}
		},
		[game.setCell, normalizedProps.editable, normalizedProps.onClick],
	);

	const renderCell = useCallback(
		(cell: CellType, index: number, rowIndex: number) => {
			const cellProps = pick(normalizedProps, [
				"cellSize",
				"aliveColor",
				"deadColor",
				"strokeColor",
				"hoverColor",
				"lineWidth",
			]);
			const CellEl = normalizedProps.cellEl ?? Cell;
			return (
				<CellEl
					id={`${normalizedProps.id}-cell-${rowIndex}-${index}`}
					key={`${rowIndex}-${index}`}
					cell={cell}
					isHover={rowIndex === hoveredIndex?.[0] && index === hoveredIndex?.[1]}
					onMouseEnter={() => setHoveredIndex([rowIndex, index])}
					onClick={() => handleClick(index, rowIndex, (cell ^ 1) as CellType)}
					{...cellProps}
				/>
			);
		},
		[handleClick, hoveredIndex, normalizedProps],
	);

	return (
		<div
			id={normalizedProps.id}
			ref={el}
			style={{ width: normalizedProps.width, height: normalizedProps.height }}
			{...normalizedProps.containerProps}
		>
			{universe.map((rows, i) => (
				<div
					style={{ display: "flex", width: "100%" }}
					id={`${normalizedProps.id}-row-${i}`}
					key={`row-${
						// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
						i
					}`}
				>
					{rows.map((cell, j) => renderCell(cell, j, i))}
				</div>
			))}
		</div>
	);
}

export const LifeGameDOM = forwardRef(LifeGameDOMComponent);
