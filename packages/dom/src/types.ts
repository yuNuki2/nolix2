import type { Cell, LifeGameGeneratorOptions } from "@nolix2/core";
import type { DEFAULT } from "./constants";

export type RenderType = "canvas" | "dom" | "svg" | "webgl";

export interface Renderer<E extends Element = Element> {
	mount: (target: E) => void;
	render: (cells: Cell[][]) => void;
	unmount: () => void;
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
	 * @default 500
	 */
	interval?: number | undefined;

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

export interface LifeGameHandle {
	start: () => void;
	stop: () => void;
	prev: () => void;
	next: () => void;
}

export interface LifeGameCanvasElement extends HTMLCanvasElement, LifeGameHandle {}
export interface LifeGameHTMLElement extends HTMLElement, LifeGameHandle {}
export interface LifeGameSVGElement extends SVGElement, LifeGameHandle {}
export interface LifeGameWebGLElement extends HTMLCanvasElement, LifeGameHandle {}

type StrictRequired<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

type SomeStrictRequired<T, K extends keyof T> = Omit<T, K> & StrictRequired<Pick<T, K>>;
