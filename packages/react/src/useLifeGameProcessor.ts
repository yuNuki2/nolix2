import LifeGame, { type Cell } from "@nolix2/core";
import LifeGameProcessor from "@nolix2/process";
import type { LifeGameRendererConfig } from "@nolix2/renderer";
import { useRef } from "react";
import { useSafeLayoutEffect } from "./hooks";
import type { LifeGamePropsWithDefaults } from "./types";

export function useLifeGameProcessor(
	props: LifeGamePropsWithDefaults,
	callback?: (universe: Cell[][], config: LifeGameRendererConfig) => void,
) {
	const game = useRef<LifeGameProcessor | null>(null);

	useSafeLayoutEffect(() => {
		const { interval, ...rendererOptions } = props;
		const generator = LifeGame.generate([props.columns, props.rows], rendererOptions);
		game.current = new LifeGameProcessor(generator, { interval });

		const unsubscribe = game.current.subscribe((universe) => callback?.(universe, props));

		if (props.mode === "auto") {
			game.current.start();
		}

		return () => {
			unsubscribe();
			game.current = null;
		};
	}, [callback, props]);

	return game.current;
}
