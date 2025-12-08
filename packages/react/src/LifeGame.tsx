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

		const dpr = props.devicePixelRatio || window.devicePixelRatio || 1;
		const width = props.width || window.innerWidth;
		const height = props.height || window.innerHeight;

		canvas.current.width = width * dpr;
		canvas.current.height = height * dpr;

		canvas.current.style.width = `${width}px`;
		canvas.current.style.height = `${height}px`;

		ctx.current = canvas.current.getContext("2d");

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
		if (!game.current) return;
		context?.setValue(canvas.current?.id || "lifegame", game.current);
	}, [context, game]);

	useEffect(() => {
		game.current?.update(props);
	}, [props, game.current?.update]);

	useImperativeHandle(ref, () => ({
		start: () => game.current?.start(),
		stop: () => game.current?.stop(),
		next: () => game.current?.next(),
		prev: () => game.current?.prev(),
	}));

	return <canvas ref={canvas} {...props.canvasProps} />;
});

export default LifeGameCanvas;
