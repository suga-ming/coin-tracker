import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import {
  categories,
  categoriesState,
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

interface INewCategory {
  newCategory: string;
}

const Title = styled.div`
  font-size: 30px;
  text-align: center;
  padding: 20px;
`;

const ToDoArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Select = styled.select`
  width: 70px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
`;

const SelectArea = styled.div`
  display: flex;
  padding: 20px;
  align-items: center;
`;

const CategoryButton = styled.button`
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
`;

const Form = styled.form`
  display: flex;
  align-items: center;
`;

const TODoArea = styled.div`
  display: flex;
  justify-content: center;
  width: 500px;
  padding-bottom: 20px;
  border-bottom: 1px solid white;
`;

const Input = styled.input`
  width: 100px;
  height: 30px;
  background-color: white;
  border: none;
  border-radius: 5px;
  margin-right: 5px;
  &::placeholder {
    color: gray;
  }
`;

const Button = styled.button`
  margin-right: 5px;
  background-color: #b9b9b9;
  color: white;
  border: none;
  width: 40px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
`;

const ToDoList = () => {
  const toDos = useRecoilValue(toDoSelector);
  const { register, handleSubmit, setValue } = useForm<INewCategory>();
  const [category, setCategory] = useRecoilState(categoryState);
  const [categories, setCategoies] = useRecoilState(categoriesState);

  const onClick = (category: string) => {
    setCategory(category);
  };

  console.log("category", category);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };

  const onValid = ({ newCategory }: INewCategory) => {
    setValue("newCategory", "");
    setCategoies([...categories, newCategory]);
    console.log("category", category);
  };
  console.log(toDos);

  return (
    <div>
      <Title>To Dos</Title>
      <ToDoArea>
        <Form onSubmit={handleSubmit(onValid)}>
          <Input
            {...register("newCategory")}
            placeholder=" 카테고리 추가"
          ></Input>
          <Button>추가</Button>
        </Form>
        <SelectArea>
          {/* <Select value={category} onInput={onInput}>
            <option value="TO_DO">TO_Do</option>
            <option value="DOING">DOING</option>
            <option value="DONE">DONE</option>
          </Select> */}
          {categories.map((availableCategory) => (
            <div key={availableCategory}>
              <CategoryButton onClick={() => onClick(availableCategory)}>
                {availableCategory}
              </CategoryButton>
            </div>
          ))}
        </SelectArea>
        <TODoArea>
          <CreateToDo />
        </TODoArea>
        {toDos?.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ToDoArea>
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
