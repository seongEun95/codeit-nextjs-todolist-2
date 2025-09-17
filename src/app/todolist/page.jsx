"use client";

import React, { useEffect, useState } from "react";
import { useTodoContext } from "../provider";
import TodoList from "@/components/TodoList";

export default function TodoListPage() {
  const {todoList, setTodoList} = useTodoContext();

  useEffect(() => {
    // 투두 데이터 불러오기
    const todoData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`);
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
  const handleFilterTodo = async (e) => {

    const selectValue = e.target.value;
    
      setTodoList((prev) => {

        if(selectValue === "todo"){
          return prev.sort((a, b) =>  b.isCompleted - a.isCompleted)
        }

        if(selectValue === 'text') {
          return prev.sort((a, b) =>  b.title.localeCompare(a.title))
        }

        if(selectValue === 'recent') {
          return prev.sort((a, b) =>  b.createdAt.localeCompare(a.createdAt))
        }
    })
  }

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
