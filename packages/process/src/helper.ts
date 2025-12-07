import { DEFAULT_PROCESSOR_OPTIONS } from "./constants";
import type { LifeGameProcessorerOptions } from "./types";

export function normalizeObject<O extends object>(obj: O): O {
	return Object.fromEntries(
		Object.entries(obj).filter(([_, value]) => value !== undefined),
	) as O;
}

export function normalizeLifeGameProcessorOptions(
	options1: LifeGameProcessorerOptions,
	options2: LifeGameProcessorerOptions = {},
) {
	return Object.assign(
		DEFAULT_PROCESSOR_OPTIONS,
		normalizeObject(options1),
		normalizeObject(options2),
	);
}
