import { DEFAULT_ORIGIN } from "../constans";
import { mapping } from "../helpers";
import type { DesignerOptions } from "../types";

export function tub(options?: DesignerOptions): number[][] {
	return mapping(options?.origin ?? DEFAULT_ORIGIN, [
		[0, 1],
		[1, 0],
		[2, 1],
		[1, 2],
	]);
}
