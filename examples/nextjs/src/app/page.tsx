"use client";

import { LifeGameCanvas, useLifeGame } from "@nolix2/react";
import type { LifeGameHandle } from "@nolix2/react/dist/src/types";
import { useEffect, useReducer, useRef } from "react";

export default function Home() {
	const { lifegame } = useLifeGame();

	useEffect(() => {
		console.log({ lifegame });
	}, [lifegame]);

	const [a, setA] = useReducer((prev) => !prev, false);

	console.log(a);

	const ref = useRef<LifeGameHandle>(null);

	return (
		<div className="grid">
			<LifeGameCanvas
				ref={ref}
				// width={20}
				// columns={20}
				// rows={200}
				aliveColor={a ? "red" : undefined}
				// interval={1000}
				// defaultCells={[
				// 	[1, 3],
				// 	[2, 3],
				// 	[3, 3],
				// 	[3, 2],
				// 	[2, 1],
				// ]}
				// strokeColor="transparent"
				// aliveColor="white"
				// deadColor="black"
			/>
			<button type="button" onClick={() => ref.current?.stop()}>
				click
			</button>
		</div>
	);
}
