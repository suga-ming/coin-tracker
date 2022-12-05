import { useRecoilState } from "recoil";
import { IToDo, toDoState } from "./atoms";

const ToDo = ({ text, category }: IToDo) => {
  const setToDos = useRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
  };
  return (
    <div>
      <li>
        <span>{text}</span>
        {category !== "DOING" && (
          <button name="DOING" onClick={onClick}>
            Doing
          </button>
        )}
        {category !== "TO_DO" && (
          <button name="TO_DO" onClick={onClick}>
            To Do
          </button>
        )}
        {category !== "DONE" && (
          <button name="DONE" onClick={onClick}>
            Done
          </button>
        )}
      </li>
    </div>
  );
};

export default ToDo;
