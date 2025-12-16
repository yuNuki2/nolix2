import type { LifeGameCoreOptions } from "@noli2/core";
import type { LifeGameProcessorerOptions } from "@noli2/processor";
import type { LifeGameRendererConfig } from "@noli2/renderer";

export interface LifeGameConfig
	extends LifeGameCoreOptions,
		LifeGameRendererConfig,
		LifeGameProcessorerOptions {}
