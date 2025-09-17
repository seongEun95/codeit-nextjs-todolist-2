"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function NewTodoPage() {
  const [inputValue, setInputValue] = useState();
  const router = useRouter();

  const handleInput = (e) => {
    console.log(e.target.value);
    setInputValue(e.target.value);
  };

  const handleCreateTodo = async (e) => {
    e.preventDefault(); // 폼 기본동작 방지

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
        method: "POST",
        body: JSON.stringify({
          title: inputValue,
          isCompleted: false,
          createdAt: new Date(),
        }),
      });

      router.push("/todolist");
    } catch (error) {
      console.error("만들기에서 에러" + error);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-4 items-start" onSubmit={handleCreateTodo}>
        <input onChange={handleInput} className="w-[300px] p-2 border-1" type="text" />
        <button className="w-[300px] p-2 border-1">투두만들기</button>
      </form>
    </div>
  );
}
