import { Δ } from "./constants";
import { binarize, generateRandom, isArray, isFunction, noDifference } from "./helper";
import type {
	Cell,
	LifeGame,
	LifeGameCreateOptions,
	LifeGameGeneratorResult,
	Size,
} from "./types";

export function createLifeGame(
	size: Size,
	options: LifeGameCreateOptions = {},
): LifeGame {
	const [columns, rows] = isArray(size) ? size : [size.columns, size.rows];
	const done = options.done ?? noDifference;

	let universe = new Uint8Array(columns * rows);
	let generation = 1;

	if (options.defaultCells) {
		for (const [x, y] of options.defaultCells) {
			universe[getIndex(x, y)] = 1;
		}
	} else {
		const density = options.density ?? 0.4;
		const rng = generateRandom(options.seed);
		universe = universe.map(() => binarize(rng() < density));
	}

	function getIndex(x: number, y: number): number {
		return y * columns + x;
	}

	function countAliveNeighbors(x: number, y: number): number {
		let count = 0;
		for (const [dx, dy] of Δ) {
			count += universe[getIndex(x + dx, y + dy)] ?? 0;
		}
		return count;
	}

	function nextGeneration() {
		const next = universe.slice();
		for (let y = 0; y < rows; y++) {
			for (let x = 0; x < columns; x++) {
				const index = getIndex(x, y);
				const neighbors = countAliveNeighbors(x, y);
				const cell = universe[index];
				// セルが生きていたとき、周りに生きたセルが２つまたは３つあれば次も生きる
				// セルが死んでいたとき、周りに生きたセルが３つあれば、生き返る
				next[index] = binarize(
					cell ? neighbors === 2 || neighbors === 3 : neighbors === 3,
				);
			}
		}
		universe.set(next);
		generation = generation + 1;
		return reshape(universe);
	}

	function reshape(universe: Uint8Array) {
		const cells: Cell[][] = [];
		for (let y = 0; y < rows; y++) {
			const row: Cell[] = [];
			for (let x = 0; x < columns; x++) {
				row.push(universe[getIndex(x, y)] as Cell);
			}
			cells.push(row);
		}
		return cells;
	}

	function next(): LifeGameGeneratorResult {
		const prev = reshape(universe);
		const next = nextGeneration();

		if (isFunction(done) && done(prev, next)) {
			return { done: true, value: { cells: prev, generation } };
		}

		return { done: false, value: { cells: next, generation } };
	}

	function toggle(x: number, y: number) {
		const index = getIndex(x, y);
		const cell = universe[index];
		universe[index] = cell ^ 1;
	}

	return {
		get cells() {
			return reshape(universe);
		},
		get generation() {
			return generation;
		},
		next,
		toggle,
	};
}

// export class LifeGame {
// 	private readonly _columns: number;
// 	private readonly _rows: number;
// 	private readonly _universe: Uint8Array;
// 	private readonly _next: Uint8Array;
// 	generation: number = 1;

// 	private constructor(
// 		columns: number,
// 		rows: number,
// 		options: LifeGameGeneratorOptions = {},
// 	) {
// 		this._columns = columns;
// 		this._rows = rows;
// 		this._universe = new Uint8Array(columns * rows);
// 		this._next = this._universe.slice();

// 		if (options.defaultCells) {
// 			for (const [x, y] of options.defaultCells) {
// 				this._universe[this.getIndex(x, y)] = 1;
// 			}
// 		} else {
// 			const density = options.density ?? 0.4;
// 			const rng = generateRandom(options.seed);
// 			this._universe = this._universe.map(() => binarize(rng() < density));
// 		}
// 	}

// 	static *generate(
// 		size: Size,
// 		options: LifeGameGeneratorOptions = {},
// 	): LifeGameGenerator {
// 		const [columns, rows] = isArray(size) ? size : [size.columns, size.rows];

// 		const done = options.done ?? noDifference;

// 		const lifegame = new LifeGame(columns, rows, options);

// 		yield { cells: lifegame.cells, generation: lifegame.generation };

// 		while (true) {
// 			const prev = lifegame.cells;
// 			const next = lifegame.nextGeneration();

// 			if (isFunction(done) && done(prev, next)) {
// 				return { cells: prev, generation: lifegame.generation };
// 			}

// 			yield { cells: next, generation: lifegame.generation };
// 		}
// 	}

// 	get cells() {
// 		return this.toCells(this._universe);
// 	}

// 	private getIndex(x: number, y: number): number {
// 		return y * this._columns + x;
// 	}

// 	private countAliveNeighbors(x: number, y: number): number {
// 		let count = 0;
// 		for (const [dx, dy] of Δ) {
// 			count += this._universe[this.getIndex(x + dx, y + dy)] ?? 0;
// 		}
// 		return count;
// 	}

// 	private toCells(universe: Uint8Array) {
// 		const cells: Cell[][] = [];
// 		for (let y = 0; y < this._rows; y++) {
// 			const row: Cell[] = [];
// 			for (let x = 0; x < this._columns; x++) {
// 				row.push(universe[this.getIndex(x, y)] as Cell);
// 			}
// 			cells.push(row);
// 		}
// 		return cells;
// 	}

// 	public nextGeneration() {
// 		for (let y = 0; y < this._rows; y++) {
// 			for (let x = 0; x < this._columns; x++) {
// 				const index = this.getIndex(x, y);
// 				const neighbors = this.countAliveNeighbors(x, y);
// 				const cell = this._universe[index];
// 				// セルが生きていたとき、周りに生きたセルが２つまたは３つあれば次も生きる
// 				// セルが死んでいたとき、周りに生きたセルが３つあれば、生き返る
// 				this._next[index] = binarize(
// 					cell ? neighbors === 2 || neighbors === 3 : neighbors === 3,
// 				);
// 			}
// 		}
// 		this._universe.set(this._next);
// 		this.generation = this.generation + 1;
// 		return this.toCells(this._universe);
// 	}

// 	public toggle(x: number, y: number) {
// 		const index = this.getIndex(x, y);
// 		const cell = this._universe[index];
// 		this._universe[index] = cell ^ 1;
// 	}
// }
