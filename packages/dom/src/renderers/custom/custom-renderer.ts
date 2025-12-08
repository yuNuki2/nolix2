import {
	createLifeGame,
	type LifeGame,
	type LifeGameCreateOptions,
	type Size,
} from "@nolix2/core";
import type { Renderer } from "@nolix2/renderer";

// biome-ignore lint/suspicious/noExplicitAny: allow any
export function createCustomRenderer<F extends new (...args: any) => any>(
	factory: (generator: LifeGame) => F,
	options: { size?: Size } & LifeGameCreateOptions = {},
): new (
	...args: ConstructorParameters<F>
) => Renderer {
	const { size, ...rest } = options;
	const core = createLifeGame(size ?? [20, 20], rest);
	return factory(core);
}
