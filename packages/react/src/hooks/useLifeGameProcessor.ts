import { createLifeGame } from "@noli2/core";
import { createLifeGameProcessor } from "@noli2/processor";
import { useState } from "react";
import type { LifeGameProps, WithDefaults } from "../types";

export function useLifeGameProcessor<P extends LifeGameProps>(props: WithDefaults<P>) {
	const [game] = useState(() => {
		const { interval, ...rendererOptions } = props;
		const generator = createLifeGame([props.columns, props.rows], rendererOptions);
		return createLifeGameProcessor(generator, { interval });
	});

	return game;
}
