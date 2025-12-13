import { createLifeGame } from "@noli2/core";
import { createLifeGameProcessor } from "@noli2/processor";
import { readable } from "svelte/store";

const a = () => {
	const core = createLifeGame([10, 10]);
	const processor = createLifeGameProcessor(core);
	const r = readable();
	return processor;
};
