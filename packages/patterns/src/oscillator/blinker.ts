import { DEFAULT_ORIGIN } from "../constans";
import { mapping } from "../helpers";
import type { DesignerOptions } from "../types";

export function blinker(options?: DesignerOptions): number[][] {
	return mapping(options?.origin ?? DEFAULT_ORIGIN, [
		[1, 0],
		[1, 1],
		[1, 2],
	]);
}
