import { atom, selector } from "recoil";
import CreateToDo from "./CreateToDo";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export enum categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
  "x" = "x",
}

export interface IToDo {
  text: string;
  id: number;
  category: categories;
}

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const categoryState = atom<categories>({
  key: "category",
  default: categories.TO_DO,
});

export const newCategoryState = atom<IToDo[]>({
  key: "newCategory",
  default: [],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
