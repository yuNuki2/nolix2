import type { LifeGameCreateOptions } from "@nolix2/core";
import type { LifeGameProcessor, LifeGameProcessorerOptions } from "@nolix2/process";
import type { LifeGameRendererConfig, LifeGameRendererOptions } from "@nolix2/renderer";
import type { ComponentProps } from "react";

interface LifeGameOptions
	extends LifeGameCreateOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererOptions {}

export interface LifeGameProps extends LifeGameOptions {
	canvasProps?: ComponentProps<"canvas"> | undefined;
}

export interface LifeGamePropsWithDefaults
	extends LifeGameCreateOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererConfig {
	canvasProps?: ComponentProps<"canvas"> | undefined;
}

export interface LifeGameContextValue {
	value: {
		lifegame?: LifeGameProcessor | undefined;
		[key: string]: LifeGameProcessor | undefined;
	};
	setValue: (id: string, value: LifeGameProcessor) => void;
}
