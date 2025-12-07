import type { LifeGameHandle } from "@nolix2/process";
import { renderCanvas } from "@nolix2/renderer";
import { forwardRef, useContext, useEffect, useImperativeHandle, useRef } from "react";
import { LifeGameContext } from "./context";
import { useSafeLayoutEffect } from "./hooks";
import type { LifeGameProps } from "./types";
import { useLifeGameProcessor } from "./useLifeGameProcessor";
import { useLifeGameProps } from "./useLifeGameProps";

const LifeGameCanvas = forwardRef<LifeGameHandle, LifeGameProps>((props, ref) => {
	const canvas = useRef<HTMLCanvasElement>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(null);

	useSafeLayoutEffect(() => {
		if (!canvas.current) return;
		ctx.current = canvas.current.getContext("2d");

		canvas.current.width = props.width ?? window.innerWidth;
		canvas.current.height = props.height ?? window.innerHeight;

		return () => {
			canvas.current?.remove();
		};
	}, [props.height, props.width]);

	const normalizedProps = useLifeGameProps(canvas, props);
	const game = useLifeGameProcessor(normalizedProps, (universe, props) => {
		renderCanvas(ctx.current, universe, props);
	});
	const context = useContext(LifeGameContext);

	useEffect(() => {
		if (!game) return;
		context?.setValue(canvas.current?.id || "lifegame", game);
	}, [context, game]);

	useEffect(() => {
		game?.update(props);
	}, [props, game?.update]);

	useImperativeHandle(ref, () => ({
		start: () => game?.start(),
		stop: () => game?.stop(),
		next: () => game?.next(),
		prev: () => game?.prev(),
	}));

	return <canvas ref={canvas} />;
});

export default LifeGameCanvas;
