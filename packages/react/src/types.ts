import type { LifeGameGeneratorOptions } from "@nolix2/core";
import type { LifeGameProcessor, LifeGameProcessorerOptions } from "@nolix2/process";
import type { LifeGameRendererConfig, LifeGameRendererOptions } from "@nolix2/renderer";
import type { ComponentProps } from "react";

interface CanvasProps
	extends Omit<ComponentProps<"canvas">, "height" | "onClick" | "width"> {}

export interface LifeGameProps
	extends CanvasProps,
		LifeGameGeneratorOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererOptions {}

export interface LifeGamePropsWithDefaults
	extends CanvasProps,
		LifeGameGeneratorOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererConfig {}

export interface LifeGameContextValue {
	value: {
		lifegame?: LifeGameProcessor | undefined;
		[key: string]: LifeGameProcessor | undefined;
	};
	setValue: (id: string, value: LifeGameProcessor) => void;
}
