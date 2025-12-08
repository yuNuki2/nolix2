"use client";

import { useLifeGame } from "@nolix2/react";

export default function A() {
	const a = useLifeGame();

	console.log({ a });

	return (
		<div>
			test
			<button
				type="button"
				onClick={() => {
					console.log({ a }, a.lifegame?.stop, "うんち");
					a?.lifegame?.stop();
				}}
			>
				stop
			</button>
		</div>
	);
}
