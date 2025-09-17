"use client";

import React, { useEffect, useState } from "react";

export default function StatusPage() {
  const [status, setStatus] = useState([]);

  useEffect(() => {
    const todoData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos`, {
          next : {revalidate : 60}
        });
        const data = await response.json();

        const completeDataLength = data.filter((v) => v.isCompleted === true).length
        const todoListDataLength = data.length - completeDataLength;

        setStatus([completeDataLength, todoListDataLength])
      } catch (error) {
        console.error("현황 페이지 에러" + error);
      }
    };

    todoData();
  }, []);

  return <div>

    <div>완료된 목록 개수 : {status[0]}  </div>
    <div>해야할 목록 개수 출력 : {status[1]}</div>
  </div>;
}
