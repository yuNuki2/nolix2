export type Cell = 0 | 1;

export type Size =
	| { columns: number; rows: number }
	| readonly [columns: number, rows: number];

export type Strategy = "full" | "diff";

export interface LifeGameCoreOptions {
	/**
	 * @example
	 * glider is [[1,3],[2,3],[3,3],[3,2],[2,1]]
	 * @default undefined
	 */
	defaultCells?: number[][] | undefined;

	/**
	 * @default 0.4
	 * This should be between 0 and 1
	 */
	density?: number | undefined;

	/**
	 * @default
	 * There is no difference between previous and current.
	 * @example (prev) => prev.flat().filter((cell) => cell === 1).length < 20
	 * if false, never stop
	 * @description
	 * */
	done?:
		| ((previousCells: Cell[][], currentCells: Cell[][]) => boolean)
		| false
		| undefined;

	/**
	 * @default 0
	 * If this is less than 1, calling the prev method will have no effect.
	 */
	historyLimit?: number | undefined;

	/**
	 * @default undefined
	 * @example
	 * "hello"
	 */
	seed?: string | undefined;

	/**
	 * @default full
	 */
	strategy?: Strategy | undefined;

	/**
	 * @default false
	 */
	wasm?: boolean | undefined;
}

export interface LifeGameGeneratorResult {
	done: boolean;
	value: LifeGameGeneratorResultValue;
}

export interface LifeGameGeneratorResultValue {
	cells: Cell[][];
	generation: number;
}

export interface LifeGame {
	readonly cells: Cell[][];
	readonly generation: number;
	readonly history: Cell[][][];
	next: () => LifeGameGeneratorResult;
	prev: () => LifeGameGeneratorResult;
	setCell: (x: number, y: number, cell: Cell) => Cell[][];
	destroy: () => void;
	update: (size: Size) => void;
}
