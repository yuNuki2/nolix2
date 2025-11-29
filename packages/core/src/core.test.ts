import { describe, expect, it } from "vitest";
import { LifeGame } from "./core";

describe("LifeGame", () => {
	it("success", () => {
		const generator = LifeGame.generate([10, 10]);
		const { value, done } = generator.next();
		expect(value).toHaveLength(10);
		expect(done).toBeFalsy();
		console.log({ value });
	});
});
