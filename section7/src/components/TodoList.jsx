import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useState } from "react";

export default function TodoList({ todos, onUpdate, onDelete }) {
  const [search, setSearch] = useState("");

  const onChangeSearch = (e) => {
    setSearch(e.target.value);
  };

  // Todo 필터링 함수
  const filterTodos = () => {
    if (search === "") {
      return todos;
    }
    // search 스테이트와 일치하는 항목만 걸러냄
    return todos.filter((todo) =>
      todo.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <div className="TodoList">
      <h4>Todos</h4>
      <input
        type="text"
        placeholder="검색어를 입력하세요"
        value={search}
        onChange={onChangeSearch}
      />
      <div className="todos_wrapper">
        {/* 걸러낸 항목으로 Todo 리스트를 만듦 */}
        {filterTodos().map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo} // spread 연산자 형태로 todo를 props로 해당 컴포넌트에 전달
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}
