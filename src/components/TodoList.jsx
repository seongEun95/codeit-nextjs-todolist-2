import Link from 'next/link'
import React from 'react'

export default function TodoList({todoList, setTodoList}) {

  // 완료 미완료 토글 이벤트
  const handleIsComplete = async (todo) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todo.id}`, {
        method: "PATCH",
        body: JSON.stringify({ isCompleted: !todo.isCompleted }),
      });

      setTodoList((prev) => prev.map((t) => (t.id === todo.id ? { ...t, isCompleted: !todo.isCompleted } : t)));
    } catch (error) {
      console.error("완료 미완료 에러" + error);
    }
  };

  // 투두 삭제 이벤트
  const handleDeleteTodo = async (todoId) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${todoId}`, {
        method: "DELETE",
      });

      setTodoList((prev) => prev.filter((t) => t.id !== todoId));
    } catch (error) {
      console.log("투두 삭제에서 에러" + error);
    }
  };

  return (
    <ul>
        {todoList && todoList.map((todo) => (
          <li key={todo.id} className="flex gap-10 p-2 items-center">
            <span>{todo.id}</span>
            <span className="text-blue-500">
              {" "}
              <Link href={`/todolist/${todo.id}`}>{todo.title}</Link>{" "}
            </span>
            <span>{todo.createdAt.split("T")[0]}</span>
            <button onClick={() => handleIsComplete(todo)} className="border-1 p-2">
              {todo.isCompleted === true ? "완료" : "미완료"}
            </button>
            <button onClick={() => handleDeleteTodo(todo.id)} className="border-1 p-2">
              삭제
            </button>
          </li>
        ))}
      </ul>
  )
}
