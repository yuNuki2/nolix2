import { computeGridSize, normalizeLifeGameRendererOptions } from "@nolix2/renderer";
import { useMemo, useState, type RefObject } from "react";
import type { LifeGameProps, WithDefaults } from "../types";
import { useSafeLayoutEffect } from "./useSafeLayoutEffect";

export function useLifeGameProps<P extends LifeGameProps>(
	ref: RefObject<Element>,
	props: P,
) {
	const normalizedProps = useMemo(() => normalizeLifeGameRendererOptions(props), [props]);

	const [normalizedPropsWithSize, setNormalizedPropsWithSize] = useState<WithDefaults<P>>(
		{
			...normalizedProps,
			cellSize: 0,
			columns: 20,
			rows: 20,
		},
	);

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
