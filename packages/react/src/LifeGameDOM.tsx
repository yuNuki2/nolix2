import type { Cell } from "@nolix2/core";
import type LifeGameProcessor from "@nolix2/process";
import {
	forwardRef,
	useCallback,
	useEffect,
	useImperativeHandle,
	useRef,
	useSyncExternalStore,
	type CSSProperties,
	type ForwardedRef,
} from "react";
import { useLifeGameConfig } from "./hooks/useLifeGameConfig";
import type { LifeGameDOMProps } from "./types";

const a: Cell[][] = [];

function LifeGameDOMComponent<E extends Element>(
	props: LifeGameDOMProps<E>,
	ref: ForwardedRef<LifeGameProcessor>,
) {
	const el = useRef<HTMLDivElement>(null);

	const { normalizedProps, game } = useLifeGameConfig(el, props);

	const universe = useSyncExternalStore(game.subscribe, game.get, () => a);

	useEffect(() => {
		if (normalizedProps.mode === "auto") {
			game.start();
		}

		// return () => {
		// 	game.stop();
		// };
	}, [game, normalizedProps.mode]);

	useImperativeHandle(ref, () => game);

	const getStyle = useCallback(
		(cell: Cell): CSSProperties => {
			const baseStyle = {
				width: normalizedProps.cellSize,
				height: normalizedProps.cellSize,
				background: cell ? normalizedProps.aliveColor : normalizedProps.deadColor,
			};
			return normalizedProps.strokeColor
				? {
						...baseStyle,
						borderWidth: normalizedProps.lineWidth,
						borderStyle: "solid",
						borderColor: normalizedProps.strokeColor,
					}
				: baseStyle;
		},
		[normalizedProps],
	);

	return (
		<div
			ref={el}
			style={{ width: normalizedProps.width, height: normalizedProps.height }}
			{...normalizedProps.containerProps}
		>
			{universe.map((rows, i) => (
				<div
					style={{ width: "100%" }}
					id={i.toString()}
					key={`${rows[i]?.toString()}-${Math.random()}`}
				>
					{rows.map((cell) => (
						<div key={Math.random()} style={getStyle(cell)} />
					))}
				</div>
			))}
		</div>
	);
}

export const LifeGameDOM = forwardRef(LifeGameDOMComponent);
