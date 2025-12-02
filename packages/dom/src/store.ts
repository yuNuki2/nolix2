import type { Cell, LifeGameGenerator, LifeGameGeneratorResultValue } from "@nolix2/core";

export interface Store {
	readonly cells: Cell[][];
	subscribe: (callback: (cells: Cell[][]) => void) => () => void;
	next: () => IteratorResult<LifeGameGeneratorResultValue, LifeGameGeneratorResultValue>;
}

export function createLifeGameObserver(generator: LifeGameGenerator): Store {
	let cells: Cell[][] = [];
	const listeners = new Set<(cells: Cell[][]) => void>();

	function subscribe(callback: (cells: Cell[][]) => void): () => void {
		listeners.add(callback);
		return () => {
			listeners.delete(callback);
		};
	}

	function next() {
		const result = generator.next();
		cells = result.value.cells;
		for (const listener of listeners) {
			listener(cells);
		}
		return result;
	}

	return { cells, subscribe, next };
}
