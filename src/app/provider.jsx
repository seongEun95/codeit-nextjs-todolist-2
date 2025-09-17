'use client'

import React, { createContext, useContext, useState } from 'react'

// 1. 만든다
const TodoContext = createContext();

// 3. 사용한다.
export const useTodoContext = () => {
  return useContext(TodoContext)
}

export default function Provider({children}) {
  const [todoList, setTodoList] = useState([]);

  // 2. 프로바이더를 주입!
  return (
    <TodoContext.Provider value={{todoList, setTodoList}}>{children}</TodoContext.Provider>
  )
}
