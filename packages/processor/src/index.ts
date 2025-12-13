import LifeGameProcessor from "./processor";

export type {
	LifeGameProcessor,
	LifeGameProcessorerOptions,
	LifeGameProcessorOptionsWithDefaults,
} from "./types";

export { normalizeLifeGameProcessorOptions } from "./helpers";
export { createLifeGameProcessor } from "./processor";

export default LifeGameProcessor;
