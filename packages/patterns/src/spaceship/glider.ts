import { DEFAULT_ORIGIN } from "../constans";
import { mapping } from "../helpers";
import type { DesignerOptions } from "../types";

export function glider(options?: DesignerOptions): number[][] {
	return mapping(options?.origin ?? DEFAULT_ORIGIN, [
		[0, 2],
		[1, 2],
		[2, 2],
		[2, 1],
		[1, 0],
	]);
}
