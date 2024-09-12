import * as data from "@/shared/constants/data";
import { useSessionStorage } from "./use-session-store";

export type Language = keyof typeof data;

export function useData(type: Language) {
  return useSessionStorage(`data:${type}`, data[type]);
}
