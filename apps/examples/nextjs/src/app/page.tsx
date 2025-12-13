"use client";

import { glider } from "@noli2/patterns";
import { LifeGameDOM, type LifeGameHandle } from "@noli2/react";
import { useRef } from "react";

export default function Home() {
	const ref = useRef<LifeGameHandle>(null);

	return (
		<div className="grid">
			<LifeGameDOM
				id="lifegame234"
				ref={ref}
				done={false}
				onNext={(e) => console.log("next", e.cells)}
				onStart={() => console.log("start")}
				onStop={() => console.log("ちんぽ")}
				strategy="diff"
				lineWidth={1}
				hoverColor="#EAC8EB"
				defaultCells={glider({ origin: [0, 10] })}
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
