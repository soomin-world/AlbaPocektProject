import { atom } from "recoil";

const today = new Date();

export const moreBtnsAtom = atom({
  key: "isMoreBtnsOpen",
  default: false,
});

export const workplaceBtnsAtom = atom({
  key: "isWorkplaceBtnsOpen",
  default: false,
});

export const searchAtom = atom({
  key: "isSearchOpen",
  default: false,
});

export const searchKeywordAtom = atom({
  key: "isSearchKeywordOpen",
  default: "",
});

export const calendarAtom = atom({
  key: "isCalendarOpen",
  default: false,
});

export const calendarDayList = atom<string[]>({
  key: "dayList",
  default: [],
});
