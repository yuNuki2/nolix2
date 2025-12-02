export type Cell = 0 | 1;

export type Size =
	| { columns: number; rows: number }
	| readonly [columns: number, rows: number];

export interface LifeGameGeneratorOptions {
	/**
	 * @example
	 * glider is [[1,3],[2,3],[3,3],[3,2],[2,1]]
	 * @default undefined
	 */
	defaultCells?: number[][] | undefined;

	/**
	 * @default 0.4
	 * @description
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
	 * @default undefined
	 * @description
	 */
	seed?: string | undefined;
}

export interface LifeGameGeneratorResultValue {
	cells: Cell[][];
	generation: number;
}

export interface LifeGameGenerator
	extends Generator<LifeGameGeneratorResultValue, LifeGameGeneratorResultValue, never> {}
