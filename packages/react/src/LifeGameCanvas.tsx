import type { LifeGameProcessor } from "@noli2/processor";
import { getCanvasPoint, point2Cell, renderCanvas } from "@noli2/renderer";
import { getWorker, initCanvas, updateCanvasConfig } from "@noli2/worker";
import {
	forwardRef,
	useEffect,
	useImperativeHandle,
	useRef,
	type ComponentProps,
	type ForwardedRef,
	type MouseEvent,
	type RefObject,
} from "react";
import { useLifeGameConfig } from "./hooks/useLifeGameConfig";
import { useSafeLayoutEffect } from "./hooks/useSafeLayoutEffect";
import type { LifeGameProps, WithDefaults } from "./types";

export interface LifeGameCanvasProps extends LifeGameProps {
	canvasProps?: ComponentProps<"canvas"> | undefined;
}

interface LifeGameCanvasProps2 extends WithDefaults<LifeGameCanvasProps> {
	game: LifeGameProcessor;
	canvas: RefObject<HTMLCanvasElement>;
}

function LifeGameCanvasComponent(
	props: LifeGameCanvasProps2,
	ref: ForwardedRef<LifeGameProcessor>,
) {
	const canvas = useRef<HTMLCanvasElement>(null);

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
	}, [props.devicePixelRatio, props.height, props.width]);

	const { normalizedProps, game } = useLifeGameConfig(canvas, props);

	useImperativeHandle(ref, () => game);

	if (props.useWorker) {
		return <LifeGameOffscreenCanvas {...normalizedProps} canvas={canvas} game={game} />;
	}
	return <LifeGameCanvasElement {...normalizedProps} canvas={canvas} game={game} />;
}

function LifeGameCanvasElement(props: LifeGameCanvasProps2) {
	const { canvas, game } = props;

	const ctx = useRef<CanvasRenderingContext2D | null>(null);

	useEffect(() => {
		if (!canvas.current) return;

		ctx.current = canvas.current.getContext("2d");

		const unsubscribe = game.subscribe((universe) =>
			renderCanvas(ctx.current, universe, props),
		);

		if (props.mode === "auto") {
			game.start();
		}

		return () => {
			unsubscribe();
			game.stop();
		};
	}, [canvas.current, game, props]);

	const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
		if (!canvas.current) return;
		const { x: dx, y: dy } = getCanvasPoint(
			e.nativeEvent,
			canvas.current,
			// TODO: 型
			props.devicePixelRatio || 1,
		);
		const { x, y } = point2Cell(
			dx,
			dy,
			props.columns,
			props.rows,
			canvas.current.width,
			canvas.current.height,
		);
		props.onClick?.(x, y);
	};

	return <canvas ref={canvas} {...props.canvasProps} onClick={handleClick} />;
}

function LifeGameOffscreenCanvas(props: LifeGameCanvasProps2) {
	const { canvas } = props;

	const offscreen = useRef<OffscreenCanvas | null>(null);
	const worker = useRef<Worker | null>(null);
	const channel = useRef<MessageChannel | null>(null);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (!canvas.current) return;

		worker.current = getWorker();
		channel.current = new MessageChannel();
		offscreen.current = canvas.current.transferControlToOffscreen();
		if (!offscreen.current) return;
		const port = channel.current.port1;
		initCanvas(worker.current, offscreen.current, port);

		return () => {
			worker.current?.terminate();
		};
	}, []);

	useEffect(() => {
		if (!worker.current || !channel.current) return;
		updateCanvasConfig(worker.current, props);

		// channel.current.port2.onmessage = (e) => {
		// 	props.onRender?.();
		// };

		return () => {
			channel.current?.port2.postMessage({ type: "cleanup" });
			channel.current?.port2.close();
		};
	}, [props]);

	const handleClick = (e: MouseEvent<HTMLCanvasElement>) => {
		if (!canvas.current) return;
		const { x: dx, y: dy } = getCanvasPoint(
			e.nativeEvent,
			canvas.current,
			// TODO: 型
			props.devicePixelRatio || 1,
		);
		const { x, y } = point2Cell(
			dx,
			dy,
			props.columns,
			props.rows,
			canvas.current.width,
			canvas.current.height,
		);
		props.onClick?.(x, y);
	};

	return <canvas ref={canvas} {...props.canvasProps} onClick={handleClick} />;
}

export const LifeGameCanvas = forwardRef(LifeGameCanvasComponent);
