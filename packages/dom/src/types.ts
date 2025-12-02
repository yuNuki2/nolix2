import type { Cell, LifeGameGeneratorOptions } from "@nolix2/core";
import type { DEFAULT } from "./constants";

export type RenderType = "canvas" | "dom" | "svg" | "webgl";

export interface Renderer<O = LifeGameRendererOptionsWithDefaults> {
	readonly options?: O;
	mount: () => void;
	render: (cells: Cell[][]) => void;
	unmount: () => void;
	update: (value: Partial<LifeGameRendererOptions>) => void;
}

export type ProcessMode = "auto" | "manual";

export interface LifeGameRendererOptions extends LifeGameGeneratorOptions {
	/**
	 * @default #64f0b4
	 */
	aliveColor?: string | undefined;

	/**
	 * @default 20
	 * @description
	 */
	columns?: number | undefined;

	/**
	 * @default #fff
	 */
	deadColor?: string | undefined;

	/**
	 * @default window.devicePixelRatio
	 */
	devicePixelRatio?: number | undefined;

	/**
	 * @default window.innerHeight
	 * @description
	 */
	height?: number | undefined;

	/**
	 * @default auto
	 */
	mode?: ProcessMode | undefined;

	/**
	 * @default undefined
	 */
	onClick?: ((x: number, y: number) => void) | undefined;

	/**
	 * @default undefined
	 */
	onRender?: ((timestamp?: DOMHighResTimeStamp) => void) | undefined;

	/**
	 * @default undefined
	 */
	onResize?: ((width: number, height: number) => void) | undefined;

	/**
	 * @default 20
	 * @description
	 */
	rows?: number | undefined;

	/**
	 * @default #c8ebeb
	 */
	strokeColor?: string | undefined;

	/**
	 * @default window.innerWidth
	 * @description
	 */
	width?: number | undefined;
}

export type LifeGameRendererOptionsWithDefaults = SomeStrictRequired<
	LifeGameRendererOptions,
	keyof typeof DEFAULT
>;

export interface LifeGameDOMRendererOptions extends LifeGameRendererOptions {
	cellEl?: keyof HTMLElementTagNameMap | undefined;
}

export type LifeGameDOMRendererOptionsWithDefaults = SomeStrictRequired<
	LifeGameDOMRendererOptions,
	keyof typeof DEFAULT
>;

export interface LifeGameControllerOptions {
	/**
	 * @default 250
	 */
	interval?: number | undefined;
}

export type LifeGameControllerOptionsWithDefaults =
	StrictRequired<LifeGameControllerOptions>;

type StrictRequired<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

type SomeStrictRequired<T, K extends keyof T> = Omit<T, K> & StrictRequired<Pick<T, K>>;
