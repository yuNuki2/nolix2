import type { LifeGameCreateOptions } from "@noli2/core";
import type { LifeGameProcessor, LifeGameProcessorerOptions } from "@noli2/processor";
import type {
	LifeGameCanvasRendererConfig,
	LifeGameRendererOptions,
} from "@noli2/renderer";

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

export type LifeGameHandle = LifeGameProcessor;

export type WithDefaults<T> = T & LifeGameCanvasRendererConfig;

export interface LifeGameContextValue {
	value: {
		lifegame?: LifeGameProcessor | undefined;
		[key: string]: LifeGameProcessor | undefined;
	};
	setValue: (id: string, value: LifeGameProcessor) => void;
}
