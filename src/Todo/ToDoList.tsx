import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  categories,
  categoryState,
  toDoSelector,
  toDoState,
} from "./components/atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  console.log(toDos);

  return (
    <div>
      <h1>To Dos</h1>
      <br />
      <select value={category} onInput={onInput}>
        <option value={categories.TO_DO}>TO_Do</option>
        <option value={categories.DOING}>DOING</option>
        <option value={categories.DONE}>DONE</option>
      </select>
      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
};

// interface IFormData {
//   errors: {
//     email: {
//       message: string;
//     };
//   };
//   email: string;
//   name: string;
//   password?: string;
//   password1?: string;
//   phoneNumber?: number;
//   extraError?: string;
// }

export default ToDoList;
