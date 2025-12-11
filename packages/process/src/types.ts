import type { Cell, LifeGameGeneratorResultValue } from "@nolix2/core";
import type { DEFAULT_PROCESSOR_OPTIONS } from "./constants";

type StrictRequired<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

type SomeStrictRequired<T, K extends keyof T> = Omit<T, K> & StrictRequired<Pick<T, K>>;

export interface LifeGameProcessorerOptions {
	/**
	 * @default 200
	 */
	interval?: number | undefined;

	/**
	 * @default undefined
	 */
	onNext?: ((value: LifeGameGeneratorResultValue) => void) | undefined;

	/**
	 * @default undefined
	 */
	onPrev?: (() => void) | undefined;

	/**
	 * @default undefined
	 */
	onStart?: (() => void) | undefined;

	/**
	 * @default undefined
	 */
	onStop?: (() => void) | undefined;
}

export type LifeGameProcessorOptionsWithDefaults = SomeStrictRequired<
	LifeGameProcessorerOptions,
	keyof typeof DEFAULT_PROCESSOR_OPTIONS
>;

export interface LifeGameProcessor {
	readonly isProcessing: boolean;
	subscribe: (callback: (universe: Cell[][]) => void) => () => void;
	get: () => Cell[][];
	next: () => void;
	prev: () => void;
	start: () => void;
	stop: () => void;
	update: (value: LifeGameProcessorerOptions) => void;
}
