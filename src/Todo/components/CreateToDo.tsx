import React from "react";
import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { categoryState, toDoState } from "./atoms";

interface IForm {
  toDo: string;
}

const Input = styled.input`
  width: 200px;
  height: 30px;
  background-color: #ac68b3;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  &::placeholder {
    color: white;
  }
`;

const Button = styled.button`
  margin-right: 5px;
  background-color: white;
  color: #ac68b3;
  border: none;
  width: 40px;
  height: 30px;
  border-radius: 5px;
  cursor: pointer;
`;

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
        <Input {...register("toDo")} placeholder=" 할 일을 입력하세요"></Input>
        <Button>추가</Button>
      </form>
    </div>
  );
};

export default CreateToDo;
