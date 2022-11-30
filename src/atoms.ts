import { atom } from "recoil";
import { purpleTheme } from "./theme";

// export const isTheme = atom({
//   key: "isTheme",
//   default: false,
// });

export const colorTheme = atom({
  key: "colorTheme",
  default: purpleTheme,
});
