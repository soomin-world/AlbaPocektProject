import { atom } from "recoil";
import type { Value } from "react-multi-date-picker";

const today = new Date();

export const moreBtnsAtom = atom({
  key: "isMoreBtnsOpen",
  default: false,
});

export const workplaceBtnsAtom = atom({
  key: "isWorkplaceBtnsOpen",
  default: false,
});

export const workDays = atom<Value>({
  key: "workDay",
  default: new Date(),
});
