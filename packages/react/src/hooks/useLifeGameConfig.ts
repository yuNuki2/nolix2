import { useContext, useEffect, type RefObject } from "react";
import { LifeGameContext } from "../context";
import type { LifeGameProps } from "../types";
import { useLifeGameProcessor } from "./useLifeGameProcessor";
import { useLifeGameProps } from "./useLifeGameProps";

export function useLifeGameConfig<E extends Element, P extends LifeGameProps>(
	el: RefObject<E>,
	props: P,
) {
	const normalizedProps = useLifeGameProps(el, props);
	const game = useLifeGameProcessor(normalizedProps);

	const context = useContext(LifeGameContext);

	useEffect(() => {
		if (!game) return;
		context?.setValue(el.current?.id || "lifegame", game);
	}, [el.current, context, game]);

	useEffect(() => {
		game.update(props);
	}, [props, game.update]);

	return { normalizedProps, game: game };
}
