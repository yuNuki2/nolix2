"use client";

import { LifeGameDOM, useLifeGame } from "@nolix2/react";
import { useEffect, useReducer, useRef } from "react";
import { LifeGameProcessor } from "../../../../packages/process/dist";

export default function Home() {
	const { lifegame } = useLifeGame();

	const [a, setA] = useReducer((prev) => !prev, false);

	const ref = useRef<LifeGameProcessor>(null);

	useEffect(() => {
		console.log(window.devicePixelRatio);
	}, []);

	return (
		<div className="grid">
			<LifeGameDOM
				ref={ref}
				// onNext={(e) => console.log("next", e.cells)}
				onStart={() => console.log("start")}
				onStop={() => console.log("ちんぽ")}
				strategy="diff"
				// useWorker
				lineWidth={2}
				// width={300}
				// height={200}
				// style={{ position: "absolute", inset: 0, zIndex: -1, opacity: 0.25 }}
				// style={{ width: 300, height: 200 }}
				// columns={20}
				// rows={200}
				// aliveColor={"red"}
				// interval={5000}
				// defaultCells={[
				// 	[1, 3],
				// 	[2, 3],
				// 	[3, 3],
				// 	[3, 2],
				// 	[2, 1],
				// ]}
				// strokeColor=
				// aliveColor="white"
				// deadColor="black"
			/>
			<button type="button" onClick={() => ref.current?.start()}>
				start
			</button>
			<button type="button" onClick={() => ref.current?.stop()}>
				stop
			</button>
		</div>
	);
}
