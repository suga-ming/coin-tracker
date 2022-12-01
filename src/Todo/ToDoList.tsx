import React from "react";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { inputValueAtom } from "../atoms";

// const ToDoList = () => {
//   const [inputValue, setInputValue] = useRecoilState(inputValueAtom);
//   const onChange = (e: React.FormEvent<HTMLInputElement>) => {
//     const {
//       currentTarget: { value },
//     } = e;
//     setInputValue(value);
//   };
//   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     console.log(inputValue);
//   };
//   return (
//     <div>
//       <form onSubmit={onSubmit}>
//         <input
//           onChange={onChange}
//           value={inputValue}
//           placeholder="여기에 입력하세요"
//         ></input>
//         <button>추가</button>
//       </form>
//     </div>
//   );
// };

interface IFormData {
  errors: {
    email: {
      message: string;
    };
  };
  email: string;
  password: string;
  name?: string;
  phoneNumber?: number;
}

const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({ defaultValues: { email: "@naver.com" } });
  const onValid = (data: any) => {
    console.log(data);
  };
  console.log(errors);
  return (
    <>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("email", {
            required: "email을 입력해주세요",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com",
            },
          })}
          placeholder="여기에 입력하세요"
        ></input>
        <input
          {...register("password", {
            required: "password를 입력해주세요",
            minLength: { value: 5, message: "5글자이상 입력해주세요" },
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com",
            },
          })}
          placeholder="이메일"
        ></input>
        <span>{errors?.email?.message}</span>
        <input {...register("name")} placeholder="이름"></input>
        <input {...register("phoneNumber")} placeholder="폰번호"></input>
        <button>추가</button>
      </form>
    </>
  );
};

export default ToDoList;
