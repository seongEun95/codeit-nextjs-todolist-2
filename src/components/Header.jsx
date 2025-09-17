import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="flex justify-between p-4">
      <h1>TODO APP</h1>
      <nav>
        <ul className="flex gap-5">
          <li>
            <Link href="/">HOME</Link>
          </li>
          <li>
            <Link href="/todolist">투두리스트</Link>
          </li>
          <li>
            <Link href="/new-todo">투두만들기</Link>
          </li>
          <li>
            <Link href="/status">현황판</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
