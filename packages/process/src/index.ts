import LifeGameProcessor from "./processor";

export type {
	LifeGameProcessor,
	LifeGameProcessorerOptions,
	LifeGameProcessorOptionsWithDefaults,
} from "./types";

export { normalizeLifeGameProcessorOptions } from "./helper";
export { createLifeGameProcessor } from "./processor";

export default LifeGameProcessor;
