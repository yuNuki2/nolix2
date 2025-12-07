import { DEFAULT_RENDERER_OPTIONS } from "./constants";
import type { LifeGameRendererOptions } from "./types";

export function normalizeObject<O extends object>(obj: O): O {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined),
	) as O;
}

export function normalizeLifeGameRendererOptions<
	O1 extends LifeGameRendererOptions,
	O2 extends LifeGameRendererOptions,
>(options1: O1, options2?: O2) {
	return Object.assign(
		DEFAULT_RENDERER_OPTIONS,
		normalizeObject(options1),
		normalizeObject(options2 ?? {}),
	);
}
