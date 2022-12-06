import { useRecoilState } from "recoil";
import { categories, IToDo, toDoState } from "./atoms";

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
  return (
    <div>
      <li>
        <span>{text}</span>
        {category !== categories.DOING && (
          <button name={categories.DOING} onClick={onClick}>
            Doing
          </button>
        )}
        {category !== categories.TO_DO && (
          <button name={categories.TO_DO} onClick={onClick}>
            To Do
          </button>
        )}
        {category !== categories.DONE && (
          <button name={categories.DONE} onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </div>
  );
};

export default ToDo;
