import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState } from "recoil";
import { inputValueAtom } from "../atoms";

const toDoState = atom({
  key: "toDo",
  default: [],
});

interface IToDo {
  text: string;
}

interface IForm {
  toDo: string;
}

const ToDoList = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onSubmit = (data: IForm) => {
    console.log("add to do", data.toDo);
    setValue("toDo", "");
  };

  return (
    <div>
      <h1>To Dos</h1>
      <br />
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("toDo")} placeholder="여기에 입력하세요"></input>
        <button>추가</button>
      </form>
      <ul></ul>
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
