import type { LifeGameCreateOptions } from "@nolix2/core";
import type { LifeGameProcessor, LifeGameProcessorerOptions } from "@nolix2/process";
import type {
	LifeGameCanvasRendererConfig,
	LifeGameRendererOptions,
} from "@nolix2/renderer";

export interface LifeGameProps
	extends LifeGameCreateOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererOptions {
	/**
	 * @default
	 * "lifegame"
	 */
	id?: string;
}

export type WithDefaults<T> = T & LifeGameCanvasRendererConfig;

export interface LifeGameContextValue {
	value: {
		lifegame?: LifeGameProcessor | undefined;
		[key: string]: LifeGameProcessor | undefined;
	};
	setValue: (id: string, value: LifeGameProcessor) => void;
}
