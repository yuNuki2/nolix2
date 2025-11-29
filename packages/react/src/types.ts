import type { LifeGameRendererOptions } from "@nolix2/dom";
import type { ComponentProps } from "react";

export interface LifeGameProps
	extends Omit<ComponentProps<"canvas">, "height" | "onClick" | "width">,
		LifeGameRendererOptions {}
