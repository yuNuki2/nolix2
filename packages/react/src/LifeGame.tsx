import { LifeGameController } from "@nolix2/dom";
import { CanvasRenderer } from "@nolix2/dom/canvas";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { LifeGameContext } from "./context";
import { useSafeLayoutEffect } from "./hooks";
import type { LifeGameHandle, LifeGameProps } from "./types";

const LifeGameCanvas = forwardRef<LifeGameHandle, LifeGameProps>((props, ref) => {
	// const {} = props;

	const canvas = useRef<HTMLCanvasElement>(null);
	const game = useRef<LifeGameController | null>(null);

	// const subscribe = useCallback((callback: () => void) => {
	// 	return game.current?.subscribe(callback) ?? (() => {});
	// }, []);

	// const getSnapshot = useCallback(() => {
	// 	return game.current?.cells ?? [];
	// }, []);

	// useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

	const context = useContext(LifeGameContext);

	useSafeLayoutEffect(() => {
		if (!canvas.current) return;
		const { interval, ...rendererOptions } = props;
		const renderer = new CanvasRenderer(canvas.current, rendererOptions);
		game.current = LifeGameController.withRenderer(renderer, { interval });
		game.current.start();

		if (context) {
			context.setValue(canvas.current.id || "lifegame", game.current);
		}

		return () => {
			game.current?.dispose();
		};
	}, []);

	useEffect(() => {
		game.current?.renderer.update(props);
	}, [props]);

	useImperativeHandle(ref, () => ({
		start: () => game.current?.start(),
		stop: () => game.current?.stop(),
		next: () => game.current?.next(),
		prev: () => game.current?.prev(),
	}));

	return <canvas ref={canvas} />;
});

export default LifeGameCanvas;
