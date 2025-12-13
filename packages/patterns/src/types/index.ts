export interface DesignerOptions {
	readonly origin?: [number, number] | undefined;
	rotate?: 90 | 180 | 270 | 360 | undefined;
}

export type Designer = (options?: DesignerOptions) => number[][];
