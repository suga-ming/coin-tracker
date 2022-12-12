import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { categories, IToDo, toDoState } from "./atoms";

const Text = styled.span`
  margin-right: 10px;
`;

const List = styled.li`
  padding: 10px;
`;

const GrayButton = styled.button`
  margin-right: 5px;
  background-color: gray;
  color: white;
  border: none;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
`;

const BlueButton = styled.button`
  margin-right: 5px;
  background-color: #9abdff;
  color: white;
  border: none;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = styled.button`
  margin-right: 5px;
  background-color: white;
  border: none;
  width: 50px;
  height: 25px;
  border-radius: 5px;
  cursor: pointer;
`;

const RedButton = styled.button`
  margin-right: 5px;
  background-color: red;
  color: white;
  border: none;
  cursor: pointer;
`;

const ToDo = ({ text, category, id }: IToDo) => {
  const [, setToDos] = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const newToDo = { text, id, category: name as any };
      const newToDos = [...oldToDos];
      newToDos.splice(targetIndex, 1, newToDo);
      return newToDos;
    });
  };
  const onDelite = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (window.confirm("일정을 삭제하시겠습니까?")) {
      setToDos((todos) => todos.filter((todo) => todo.id !== id));
    } else {
      alert("일정을 삭제하지 않겠습니다.");
    }
  };

  return (
    <div>
      <List>
        <Text>{text}</Text>
        {category !== categories.DOING && (
          <BlueButton name={categories.DOING} onClick={onClick}>
            Doing
          </BlueButton>
        )}
        {category !== categories.TO_DO && (
          <Button name={categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}
        {category !== categories.DONE && (
          <GrayButton name={categories.DONE} onClick={onClick}>
            Done
          </GrayButton>
        )}
        <RedButton onClick={onDelite}>x</RedButton>
      </List>
    </div>
  );
};

export default ToDo;
