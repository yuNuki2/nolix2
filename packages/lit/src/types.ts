import type { LifeGameCreateOptions } from "@noli2/core";
import type { LifeGameProcessorerOptions } from "@noli2/processor";
import type { LifeGameRendererOptions } from "../../renderer/dist";

export interface LifeGameProps
	extends LifeGameCreateOptions,
		LifeGameProcessorerOptions,
		LifeGameRendererOptions {
	id?: string;
}
