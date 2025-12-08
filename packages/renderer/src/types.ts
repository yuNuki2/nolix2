import type { DEFAULT_RENDERER_OPTIONS } from "./constants";

type StrictRequired<T> = {
	[P in keyof T]-?: NonNullable<T[P]>;
};

type SomeStrictRequired<T, K extends keyof T> = Omit<T, K> & StrictRequired<Pick<T, K>>;

export type Cell = 0 | 1;

export type ProcessMode = "auto" | "manual";

export interface LifeGameRendererOptions {
	/**
	 * @default #64f0b4
	 */
	aliveColor?: string | undefined;

	/**
	 * @default 32
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
	 * @default 32
	 * @description
	 */
	rows?: number | undefined;

	/**
	 * @default #c8ebeb
	 * if false, hide stroke
	 */
	strokeColor?: false | string | undefined;

	/**
	 * @default window.innerWidth
	 * @description
	 */
	width?: number | undefined;
}

export interface GridSize {
	cellSize: number;
	columns: number;
	rows: number;
}

export type LifeGameRendererConfig = SomeStrictRequired<
	LifeGameRendererOptions,
	keyof typeof DEFAULT_RENDERER_OPTIONS
> &
	GridSize;

export interface LifeGameCanvasRendererOptions extends LifeGameRendererOptions {
	/**
	 * @default false
	 */
	useWorker?: boolean | undefined;
}

export type LifeGameCanvasRendererConfig = SomeStrictRequired<
	LifeGameCanvasRendererOptions,
	keyof typeof DEFAULT_RENDERER_OPTIONS
> &
	GridSize;

export interface Renderer<O = LifeGameRendererConfig> {
	readonly config?: O;
	mount: () => void;
	render: (cells: Cell[][]) => void;
	unmount: () => void;
	update: (value: Partial<LifeGameRendererOptions>) => void;
}
