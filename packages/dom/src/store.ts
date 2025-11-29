import type { Cell, LifeGameGenerator } from "@nolix2/core";

export interface Store {
	readonly cells: Cell[][];
	subscribe: (callback: () => void) => () => void;
	next: () => void;
}

export function createLifeGameObserver(generator: LifeGameGenerator): Store {
	let cells: Cell[][] = [];
	const listeners = new Set<() => void>();

	function subscribe(callback: () => void): () => void {
		listeners.add(callback);
		return () => {
			listeners.delete(callback);
		};
	}

	function next() {
		cells = generator.next().value;
		for (const listener of listeners) {
			listener();
		}
	}

	return {
		get cells() {
			return cells;
		},
		subscribe,
		next,
	};
}
