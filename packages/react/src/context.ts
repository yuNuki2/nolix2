import { createContext } from "react";
import type { LifeGameContextValue } from "./types";

export const LifeGameContext = createContext<LifeGameContextValue | null>(null);
