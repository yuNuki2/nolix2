import { describe, expect, it } from "vitest";
import { createLifeGame } from "./core";
import type { LifeGameGeneratorResultValue } from "./types";

const SIZE = [20, 10] as const;

describe("LifeGame", () => {
	it("長さ", () => {
		const g1 = createLifeGame(SIZE);
		expect(g1.next().value.cells.flat()).toHaveLength(200);
		const g2 = createLifeGame({ columns: 20, rows: 10 });
		expect(g2.next().value.cells.flat()).toHaveLength(200);
	});
	it("すべて1", () => {
		const g = createLifeGame(SIZE, { density: 1 });
		for (const row of g.next().value.cells) {
			for (const cell of row) {
				expect(cell).toBe(1);
			}
		}
	});
	it("すべて0", () => {
		const g = createLifeGame(SIZE, { density: 0 });
		for (const row of g.next().value.cells) {
			for (const cell of row) {
				expect(cell).toBe(0);
			}
		}
	});
	it("ランダム", () => {
		const g1 = createLifeGame(SIZE, { density: 0.5 });
		const g2 = createLifeGame(SIZE, { density: 0.5 });
		const actual1 = g1.next().value;
		expect(actual1).toEqual(actual1);
		expect(actual1).not.toEqual(g2.next().value);
	});
	it("シード", () => {
		const g1 = createLifeGame(SIZE, { density: 0.5, seed: "hello" });
		const g2 = createLifeGame(SIZE, { density: 0.5, seed: "hello" });
		expect(g1.next().value).toEqual(g2.next().value);
		expect(g1.next().value).toEqual(g2.next().value);
	});
	it("終了する", () => {
		const g1 = createLifeGame(SIZE, { density: 0.5, seed: "hello" });
		expect(g1.next().done).toBeTruthy();
	});
	it("無限ループ", () => {
		const g1 = createLifeGame(SIZE, { density: 0.5, seed: "hello", done: false });
		let i = 0;
		do {
			g1.next();
			i++;
		} while (i < 10000);
		expect(g1.next().done).toBeFalsy();
	});
	it("done", () => {
		const g1 = createLifeGame(SIZE, {
			density: 0.5,
			seed: "hello",
			done: (prev) => prev.flat().filter((cell) => cell === 1).length < 20,
		});
		let result: IteratorResult<
			LifeGameGeneratorResultValue,
			LifeGameGeneratorResultValue
		>;
		do {
			result = g1.next();
		} while (!result.done);
		expect(g1.next().done).toBeTruthy();
	});
	it.only("グライダー", () => {
		const g1 = createLifeGame([10, 10], {
			defaultCells: [
				[1, 3],
				[2, 3],
				[3, 3],
				[3, 2],
				[2, 1],
			],
		});
		let result: IteratorResult<
			LifeGameGeneratorResultValue,
			LifeGameGeneratorResultValue
		>;
		do {
			result = g1.next();
			// console.log(JSON.stringify(result.value.cells).split(","));
		} while (!result.done);
	});
	it("generation", () => {
		const g = createLifeGame(SIZE);
		expect(g.next().value.generation).toBe(1);
		expect(g.next().value.generation).toBe(2);
	});
});
