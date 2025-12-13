export function collaborate(...args: number[][][]): number[][] {
	return args.flat();
}

export function collaborateStringify(...args: number[][][]): string {
	return collaborate(...args)
		.flat()
		.join();
}

export function mapping(
	origin: readonly [number, number],
	target: number[][],
): number[][] {
	const [dx, dy] = origin;
	return target.map(([x, y]) => {
		return [x + dx, y + dy];
	});
}
