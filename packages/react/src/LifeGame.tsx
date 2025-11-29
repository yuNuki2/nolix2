import { CanvasRenderer } from "@nolix2/dom";
import {
	forwardRef,
	useCallback,
	useImperativeHandle,
	useRef,
	useSyncExternalStore,
} from "react";
import type { LifeGameHandle } from "../../dom/dist/src/types";
import { useSafeLayoutEffect } from "./hooks";
import type { LifeGameProps } from "./types";

const LifeGameCanvas = forwardRef<LifeGameHandle, LifeGameProps>((props, ref) => {
	// const {} = props;

	const canvas = useRef<HTMLCanvasElement>(null);
	const renderer = useRef<CanvasRenderer | null>(null);

	const subscribe = useCallback((callback: () => void) => {
		return renderer.current?.store.subscribe(callback) ?? (() => {});
	}, []);

	const getSnapshot = useCallback(() => {
		return renderer.current?.store.cells ?? [];
	}, []);

	useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

	useSafeLayoutEffect(() => {
		renderer.current = new CanvasRenderer(canvas.current, props);
		renderer.current.mount();

		return () => {
			renderer.current?.unmount();
		};
	}, []);

	useImperativeHandle(ref, () => ({
		start: () => {},
		stop: () => {},
		next: () => {},
		prev: () => {},
	}));

	return <canvas ref={canvas} width={props.width} height={props.height} />;
});

export default LifeGameCanvas;
