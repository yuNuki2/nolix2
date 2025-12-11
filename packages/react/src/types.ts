import type { Cell, LifeGameCreateOptions } from "@nolix2/core";
import type { LifeGameProcessor, LifeGameProcessorerOptions } from "@nolix2/process";
import type {
	LifeGameCanvasRendererConfig,
	LifeGameRendererOptions,
} from "@nolix2/renderer";
import type { ComponentProps } from "react";

export interface LifeGameProps
	extends LifeGameCreateOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererOptions {}

export interface LifeGameCanvasProps extends LifeGameProps {
	canvasProps?: ComponentProps<"canvas"> | undefined;
}

export interface LifeGameDOMProps<E extends Element> extends LifeGameProps {
	/**
	 * @default undefined
	 */
	containerProps?: ComponentProps<"div"> | undefined;

	/**
	 * @default
	 */
	cellEl?: ((cell: Cell) => E) | undefined;
}

export interface LifeGameSVGProps extends LifeGameProps {
	svgProps?: ComponentProps<"svg"> | undefined;
}

export type WithDefaults<T> = T & LifeGameCanvasRendererConfig;

export interface LifeGameContextValue {
	value: {
		lifegame?: LifeGameProcessor | undefined;
		[key: string]: LifeGameProcessor | undefined;
	};
	setValue: (id: string, value: LifeGameProcessor) => void;
}
