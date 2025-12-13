import type LifeGameProcessor from "@noli2/process";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	useSyncExternalStore,
	type ComponentProps,
	type ForwardedRef,
} from "react";
import { useLifeGameConfig } from "./hooks/useLifeGameConfig";
import { useSafeLayoutEffect } from "./hooks/useSafeLayoutEffect";
import type { LifeGameProps } from "./types";

export interface LifeGameSVGProps extends LifeGameProps {
	svgProps?: ComponentProps<"svg"> | undefined;
}

function LifeGameSVGComponent(
	props: LifeGameSVGProps,
	ref: ForwardedRef<LifeGameProcessor>,
) {
	const svg = useRef<SVGSVGElement>(null);

	useSafeLayoutEffect(() => {
		if (!svg.current) return;

		const width = props.width || window.innerWidth;
		const height = props.height || window.innerHeight;

		svg.current.style.width = `${width}px`;
		svg.current.style.height = `${height}px`;
	}, [props]);

	const {
		normalizedProps: {
			id,
			mode,
			width,
			height,
			cellSize,
			strokeColor,
			aliveColor,
			deadColor,
			svgProps,
		},
		game,
	} = useLifeGameConfig(svg, props);

	const universe = useSyncExternalStore(game.subscribe, game.get, game.get);

	useEffect(() => {
		if (mode === "auto") {
			game.start();
		}

		// return () => {
		// 	game.stop();
		// };
	}, [game, mode]);

	useImperativeHandle(ref, () => game);

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			ref={svg}
			width={width}
			height={height}
			{...svgProps}
		>
			<title>Game of Life</title>
			{universe.flatMap((rows, y) =>
				rows.map((cell, x) => (
					<rect
						key={`${id}-rect-${y}-${
							// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
							x
						}`}
						x={x * cellSize}
						y={y * cellSize}
						width={cellSize}
						height={cellSize}
						stroke={strokeColor === false ? undefined : strokeColor}
						fill={cell ? aliveColor : deadColor}
					/>
				)),
			)}
		</svg>
	);
}

export const LifeGameSVG = forwardRef(LifeGameSVGComponent);
