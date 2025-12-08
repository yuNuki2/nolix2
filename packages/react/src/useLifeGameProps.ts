import { computeGridSize, normalizeLifeGameRendererOptions } from "@nolix2/renderer";
import { useMemo, useState, type RefObject } from "react";
import { useSafeLayoutEffect } from "./hooks";
import type { LifeGameProps, LifeGamePropsWithDefaults } from "./types";

export function useLifeGameProps(ref: RefObject<Element>, props: LifeGameProps) {
	const normalizedProps = useMemo(() => normalizeLifeGameRendererOptions(props), [props]);

	const [normalizedPropsWithSize, setNormalizedPropsWithSize] =
		useState<LifeGamePropsWithDefaults>({
			...normalizedProps,
			cellSize: 0,
			columns: 20,
			rows: 20,
		});

	useSafeLayoutEffect(() => {
		if (!ref.current) return;
		const config = computeGridSize(ref.current, normalizedProps);
		setNormalizedPropsWithSize({
			...normalizedProps,
			...config,
			width: window.innerWidth,
			height: window.innerHeight,
			devicePixelRatio: window.devicePixelRatio,
		});
	}, [normalizedProps, ref]);

	return normalizedPropsWithSize;
}
