"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

export default function TodoDetailPage() {
  const [todoDetail, setTodoDetail] = useState([]);
  const params = useParams();
  const router = useRouter();

  useEffect(() => {
    console.log(params);
    const todoDetailData = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/todos/${params.id}`);
        const data = await response.json();

        console.log(data);
        setTodoDetail(data);
      } catch (error) {
        console.error("상세페이지 데이터 불러오기 에러" + error);
      }
    };

    todoDetailData();
  }, []);

  const handleMoveToTodoListPage = () => {
    router.push("/todolist");
  };

  return (
    <div>
      <h2 className="text-center mb-4">상세페이지</h2>
      <div className="my-4">타이틀 : {todoDetail.title}</div>
      <button onClick={handleMoveToTodoListPage} className="border-1 p-2">
        리스트 페이지로 이동
      </button>
    </div>
  );
}
