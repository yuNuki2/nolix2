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
	const { density = 0.4, done = noDifference, strategy = "full" } = options;

	let universe = new Uint8Array(columns * rows);
	let generation = 1;

	let candidates = new Set<number>();

	for (let i = 0; i < universe.length; i++) {
		candidates.add(i);
	}

	if (options.defaultCells) {
		for (const [x, y] of options.defaultCells) {
			universe[toIndex(x, y)] = 1;
		}
	} else {
		const rng = generateRandom(options.seed);
		universe = universe.map(() => binarize(rng() < density));
	}

	function toIndex(x: number, y: number): number {
		return y * columns + x;
	}

	function fromIndex(index: number): { x: number; y: number } {
		const x = index % columns;
		const y = (index / columns) | 0;
		return { x, y };
	}

	function isOutOfBounds(x: number, y: number): boolean {
		return x < 0 || y < 0 || x >= columns || y >= rows;
	}

	function countAliveNeighbors(x: number, y: number): number {
		let count = 0;
		for (const [dx, dy] of Δ) {
			const nx = x + dx;
			const ny = y + dy;
			if (isOutOfBounds(nx, ny)) continue;
			count += universe[toIndex(nx, ny)] ?? 0;
		}
		return count;
	}

	function computeNextCell(x: number, y: number, cell: number) {
		const neighbors = countAliveNeighbors(x, y);
		// セルが生きていたとき、周りに生きたセルが２つまたは３つあれば次も生きる
		// セルが死んでいたとき、周りに生きたセルが３つあれば、生き返る
		return binarize(cell ? neighbors === 2 || neighbors === 3 : neighbors === 3);
	}

	function nextGeneration() {
		const next = universe.slice();
		const nextCandidates = new Set<number>();

		function collectCanidates(x: number, y: number) {
			for (const [dx, dy] of [[0, 0], ...Δ]) {
				const nx = x + dx;
				const ny = y + dy;
				if (isOutOfBounds(nx, ny)) continue;
				nextCandidates.add(toIndex(nx, ny));
			}
		}

		if (strategy === "diff") {
			for (const index of candidates) {
				const { x, y } = fromIndex(index);
				const cell = universe[index];
				const nextState = computeNextCell(x, y, cell);
				if (cell ^ nextState) {
					next[index] = nextState;
					collectCanidates(x, y);
				}
			}
		} else {
			for (let i = 0; i < universe.length; i++) {
				const { x, y } = fromIndex(i);
				const cell = universe[i];
				next[i] = computeNextCell(x, y, cell);
			}
		}

		universe.set(next);
		generation = generation + 1;
		candidates = nextCandidates;
		return reshape(universe);
	}

	function reshape(universe: Uint8Array) {
		const cells: Cell[][] = [];
		for (let y = 0; y < rows; y++) {
			const row: Cell[] = [];
			for (let x = 0; x < columns; x++) {
				row.push(universe[toIndex(x, y)] as Cell);
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
		const index = toIndex(x, y);
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

export class LifeGameCore {
	private constructor() {}
	static create(...args: Parameters<typeof createLifeGame>) {
		return createLifeGame(...args);
	}
}
