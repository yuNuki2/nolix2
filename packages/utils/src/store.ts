export type Atom<T> = { init: T };

export type AtomState<T> = {
	value: T;
	listeners: Set<() => void>;
};

export function atom<T>(init: T): Atom<T> {
	return { init };
}

const store = new WeakMap();

function getAtomState<T>(atom: Atom<T>): AtomState<T> {
	const state = store.get(atom) as AtomState<T>;

	if (!state) {
		const state = { value: atom.init, listeners: new Set<() => void>() };
		store.set(atom, state);
		return state;
	}
	return state;
}

export function createAtomState<T>(atom: Atom<T>) {
	const state = getAtomState(atom);

	function subscribe(callback: () => void): () => void {
		state.listeners.add(callback);

		return () => {
			state.listeners.delete(callback);
		};
	}

	function get() {
		return state.value;
	}

	function set(value: T | ((prev: T) => T)): T {
		return update(value);
	}

	function update(value: Partial<T> | ((prev: T) => Partial<T>)): T {
		const prev = state.value;
		const next = isFunction(value) ? value(prev) : value;
		state.value = { ...prev, ...next };
		for (const listener of state.listeners) {
			listener();
		}
		return state.value;
	}

	return {
		get,
		subscribe,
		set,
		update,
	};
}

function isFunction(value: unknown): value is Function {
	return typeof value === "function";
}
