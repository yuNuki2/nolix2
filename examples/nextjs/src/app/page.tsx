"use client";

import { LifeGameCanvas } from "@nolix2/react";

export default function Home() {
	return (
		<div className="grid">
			<LifeGameCanvas columns={50} />
		</div>
	);
}
