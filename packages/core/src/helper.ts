/** biome-ignore-all lint/suspicious/noExplicitAny: allow any */
import seedrandom from "seedrandom";
import type { Cell } from "./types";

export function isArray(arg: any): arg is readonly any[] {
	return Array.isArray(arg);
}

export function isFunction(value: unknown): value is (...args: any[]) => any {
	return typeof value === "function";
}

export function binarize(value: boolean): Cell {
	return (value && 1) || 0;
}

export function noDifference(prev: Cell[][], curr: Cell[][]): boolean {
	for (let i = 0; i < prev.length; i++) {
		for (let j = 0; j < prev[i].length; j++) {
			if (prev[i][j] ^ curr[i][j]) return false;
		}
	}
	return true;
}

export function clone(universe: Cell[][]): Cell[][] {
	return universe.map((rows) => rows.concat());
}

export function generateRandom(seed: string | undefined) {
	return seedrandom(seed);
}
