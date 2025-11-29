import LifeGame, {
	type LifeGameGenerator,
	type LifeGameGeneratorOptions,
	type Size,
} from "@nolix2/core";
import type { Renderer } from "../types";

// biome-ignore lint/suspicious/noExplicitAny: allow any
export function createCustomRenderer<F extends new (...args: any) => any>(
	factory: (generator: LifeGameGenerator) => F,
	options: { size?: Size } & LifeGameGeneratorOptions = {},
): new (
	...args: ConstructorParameters<F>
) => Renderer {
	const { size, ...rest } = options;
	const core = LifeGame.generate(size ?? [20, 20], rest);
	return factory(core);
}
