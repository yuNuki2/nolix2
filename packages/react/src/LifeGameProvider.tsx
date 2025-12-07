"use client";

import type { LifeGameProcessor } from "@nolix2/process";
import { useCallback, useState, type ReactNode } from "react";
import { LifeGameContext } from "./context";
import type { LifeGameContextValue } from "./types";

export default function LifeGameProvider({ children }: { children: ReactNode }) {
	const [value, setValue] = useState<LifeGameContextValue["value"]>({});

	const _setValue = useCallback((id: string, value: LifeGameProcessor) => {
		setValue((prev) => {
			prev[id] = value;
			return prev;
		});
	}, []);

	return (
		<LifeGameContext.Provider value={{ value, setValue: _setValue }}>
			{children}
		</LifeGameContext.Provider>
	);
}
