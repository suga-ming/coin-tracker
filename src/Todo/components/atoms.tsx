import { atom, selector } from "recoil";
import CreateToDo from "./CreateToDo";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const defaultCategories = ["TO_DO", "DOING", "DONE"];

export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "x" = "x",
}

export interface IToDo {
  text: string;
  id: number;
  category: string;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<string>({
  key: "category",
  default: defaultCategories[0],
  effects_UNSTABLE: [persistAtom],
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: defaultCategories,
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
