import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useState, useMemo, useContext } from "react";
import { TodoStateContext } from "./TodoContext";

export default function TodoList() {
  const [search, setSearch] = useState("");

  const todos = useContext(TodoStateContext);

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
        {/* 미완료 Todo 리스트 */}
        {filterTodos()
          .filter((todo) => !todo.isDone)
          .map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
      </div>
      <div className="todos_wrapper">
        {/* 완료 Todo 리스트 */}
        {filterTodos()
          .filter((todo) => todo.isDone)
          .map((todo) => (
            <TodoItem key={todo.id} {...todo} />
          ))}
      </div>
    </div>
  );
}
