import { DEFAULT_ORIGIN } from "../constans";
import { mapping } from "../helpers";
import type { DesignerOptions } from "../types";

export function block(options?: DesignerOptions): number[][] {
	return mapping(options?.origin ?? DEFAULT_ORIGIN, [
		[0, 0],
		[1, 0],
		[0, 1],
		[1, 1],
	]);
}
