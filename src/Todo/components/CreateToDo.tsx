import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

const CreateToDo = () => {
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const category = useRecoilValue(categoryState);
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onSubmit = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("toDo")} placeholder="여기에 입력하세요"></input>
        <button>추가</button>
      </form>
    </div>
  );
};

export default CreateToDo;
