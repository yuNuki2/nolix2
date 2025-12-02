import type {
	LifeGameController,
	LifeGameControllerOptions,
	LifeGameRendererOptions,
} from "@nolix2/dom";
import type { ComponentProps } from "react";

export interface LifeGameProps
	extends Omit<ComponentProps<"canvas">, "height" | "onClick" | "width">,
		LifeGameRendererOptions,
		LifeGameControllerOptions {}

export interface LifeGameContextValue {
	value: {
		lifegame?: LifeGameController | undefined;
		[key: string]: LifeGameController | undefined;
	};
	setValue: (id: string, value: LifeGameController) => void;
}

export interface LifeGameHandle {
	start: () => void;
	stop: () => void;
	prev: () => void;
	next: () => void;
}
