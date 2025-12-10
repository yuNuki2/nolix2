import { createLifeGame } from "@nolix2/core";
import LifeGameProcessor from "@nolix2/process";
import { useRef } from "react";
import { useSafeLayoutEffect } from "./hooks";
import type { LifeGamePropsWithDefaults } from "./types";

export function useLifeGameProcessor(props: LifeGamePropsWithDefaults) {
	const game = useRef<LifeGameProcessor | null>(null);

	useSafeLayoutEffect(() => {
		const { interval, ...rendererOptions } = props;
		const generator = createLifeGame([props.columns, props.rows], rendererOptions);
		game.current = new LifeGameProcessor(generator, { interval });
	}, [props]);

	return game;
}
