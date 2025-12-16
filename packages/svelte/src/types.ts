import type { LifeGameCoreOptions } from "@noli2/core";
import type { LifeGameProcessorerOptions } from "@noli2/processor";
import type { LifeGameRendererOptions } from "@noli2/renderer";

export interface LifeGameProps
	extends LifeGameCoreOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererOptions {
	id?: string;
}
