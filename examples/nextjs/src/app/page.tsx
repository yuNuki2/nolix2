"use client";

import { LifeGameCanvas, type LifeGameHandle, useLifeGame } from "@nolix2/react";
import { useReducer, useRef } from "react";

export default function Home() {
	const { lifegame } = useLifeGame();

	const [a, setA] = useReducer((prev) => !prev, false);

	const ref = useRef<LifeGameHandle>(null);

	return (
		<div className="grid">
			<LifeGameCanvas
				ref={ref}
				// width={20}
				// columns={20}
				// rows={200}
				// aliveColor={"red"}
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
