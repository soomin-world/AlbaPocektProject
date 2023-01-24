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

export const boardModalAtom = atom({
  key: "isBoardOpen",
  default: false,
});

export const boardAtom = atom({
  key: "boardType",
  default: "전체",
});

// export const calendarDayListFormat = selector<string[]>({
//   key : "dayFormat",
//   get:({get})=>get(calendarDayList.map((d)=>d.slice(" "))
// })
