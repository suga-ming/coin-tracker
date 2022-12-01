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
  name: string;
  password?: string;
  password1?: string;
  phoneNumber?: number;
  extraError?: string;
}

const ToDoList = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<IFormData>({ defaultValues: { email: "@naver.com" } });
  const onValid = (data: IFormData) => {
    if (data.password !== data.password1) {
      setError("password1", { message: "password가 다릅니다" });
    }
    setError(
      "extraError",
      { message: "server offline" },
      { shouldFocus: true }
    );
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
          {...register("name", {
            required: "name을 입력해주세요",
            validate: (value) =>
              !value.includes("by") ? "no by allowed" : true,
            minLength: { value: 1, message: "1글자이상 입력해주세요" },
          })}
          placeholder="성함"
        ></input>
        <span>{errors?.email?.message}</span>
        <input
          {...register("password")}
          placeholder="비밀번호를 입력해주세요"
        ></input>
        <input
          {...register("password1")}
          placeholder="비밀번호를 다시 입력해주세요"
        ></input>
        <input {...register("phoneNumber")} placeholder="폰번호"></input>
        <button>추가</button>
        <span>{errors?.extraError?.message}</span>
      </form>
    </>
  );
};

export default ToDoList;
