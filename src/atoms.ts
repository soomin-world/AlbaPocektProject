import { atom } from "recoil";

export const moreBtnsAtom = atom({
  key: "isMoreBtnsOpen",
  default: false,
});

export const workplaceBtnsAtom = atom({
  key: "isWorkplaceBtnsOpen",
  default: false,
});
