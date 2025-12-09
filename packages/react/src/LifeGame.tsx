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
	const offscreen = useRef<OffscreenCanvas | null>(null);
	const ctx = useRef<CanvasRenderingContext2D | null>(null);
	const worker = useRef<Worker | null>(null);
	const channel = useRef<MessageChannel | null>(null);

	useSafeLayoutEffect(() => {
		if (!canvas.current) return;

		const dpr = props.devicePixelRatio || window.devicePixelRatio || 1;
		const width = props.width || window.innerWidth;
		const height = props.height || window.innerHeight;

		canvas.current.width = width * dpr;
		canvas.current.height = height * dpr;

		canvas.current.style.width = `${width}px`;
		canvas.current.style.height = `${height}px`;

		return () => {
			canvas.current?.remove();
		};
	}, [props.height, props.width]);

	useEffect(() => {
		if (!canvas.current) return;
		if (props.useWorker) {
			const scriptURL = new URL("./worker.js", import.meta.url);
			worker.current = new Worker(scriptURL);
			channel.current = new MessageChannel();
			offscreen.current = canvas.current.transferControlToOffscreen();
			if (!offscreen.current) return;
			console.log({ offscreen });
			const port = channel.current.port1;
			worker.current.postMessage({ canvas: offscreen.current, port }, [
				offscreen.current,
				port,
			]);
		} else {
			ctx.current = canvas.current.getContext("2d");
		}
	}, [props.useWorker]);

	const normalizedProps = useLifeGameProps(canvas, props);
	const game = useLifeGameProcessor(normalizedProps, (universe, props) => {
		if (props.useWorker && worker.current && channel.current) {
			console.log("use worker", { offscreen });
			const {
				width,
				height,
				rows,
				columns,
				aliveColor,
				deadColor,
				strokeColor,
				cellSize,
			} = props;
			worker.current.postMessage({
				universe,
				config: {
					width,
					height,
					rows,
					columns,
					aliveColor,
					deadColor,
					strokeColor,
					cellSize,
				},
			});

			channel.current.port2.onmessage = (e) => {
				props.onRender?.();
			};

			return () => {
				channel.current?.port2.close();
			};
		} else {
			renderCanvas(ctx.current, universe, props);
		}
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
