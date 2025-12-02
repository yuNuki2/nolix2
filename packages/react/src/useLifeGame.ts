import { useContext } from "react";
import { LifeGameContext } from "./context";

export function useLifeGame() {
	const context = useContext(LifeGameContext);

	console.log({ context });

	if (!context) {
		throw new Error("useLifeGame must be within <LifeGameProvider>");
	}

	return context.value;
}
