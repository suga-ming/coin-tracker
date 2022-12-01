import { atom } from "recoil";
import { purpleTheme } from "./theme";

//Coin Tracker
// export const isTheme = atom({
//   key: "isTheme",
//   default: false,
// });

export const colorTheme = atom({
  key: "colorTheme",
  default: purpleTheme,
});

//To Do List
export const inputValueAtom = atom({
  key: "inputValueAtom",
  default: "",
});
