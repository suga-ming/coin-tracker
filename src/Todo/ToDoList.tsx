import { useRecoilState } from "recoil";
import { toDoState } from "./components/atoms";
import CreateToDo from "./components/CreateToDo";
import ToDo from "./components/ToDo";

export interface IToDo {
  text: string;
  id: number;
  category: "TO_DO" | "DOING" | "DONE";
}

const ToDoList = () => {
  const [toDos] = useRecoilState(toDoState);

  return (
    <div>
      <h1>To Dos</h1>
      <br />
      <CreateToDo />
      <ul>
        {toDos.map((toDo) => (
          <ToDo key={toDo.id} {...toDo} />
        ))}
      </ul>
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
