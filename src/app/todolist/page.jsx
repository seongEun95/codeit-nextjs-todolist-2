"use client";

import React, { useEffect, useState } from "react";
import { useTodoContext } from "../provider";
import TodoList from "@/components/TodoList";

export default function TodoListPage() {
  const { todoList, setTodoList } = useTodoContext();

  useEffect(() => {
    // 투두 데이터 불러오기
    const todoData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/todos`
        );
        const data = await response.json();
        console.log(data);
        setTodoList(data);
      } catch (error) {
        console.error("데이터 불러오기 에러" + error);
      }
    };

    todoData();
  }, []);

  // 정렬 검색 기능
  const handleFilterTodo = (e) => {
    const selectValue = e.target.value;

    setTodoList((prev) => {
      const sortedList = [...prev]; // 원본 배열 복사

      if (selectValue === "todo") {
        return sortedList.sort((a, b) => a.isCompleted - b.isCompleted); // 미완료 항목을 먼저
      }

      if (selectValue === "text") {
        return sortedList.sort((a, b) => a.title.localeCompare(b.title)); // 가나다 순으로 정렬
      }

      if (selectValue === "recent") {
        return sortedList.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ); // 최신 순으로 정렬
      }

      // 기본값("선택") 또는 기타 값일 경우 원본 순서 유지
      return sortedList;
    });
  };

  return (
    <div>
      <div>
        <select onChange={handleFilterTodo} className="border-1 p-2">
          <option value="선택">선택</option>
          <option value="todo">할일 순</option>
          <option value="text">가나다(abc) 순</option>
          <option value="recent">등록일자 순</option>
        </select>
      </div>
      <TodoList todoList={todoList} setTodoList={setTodoList} />
    </div>
  );
}
