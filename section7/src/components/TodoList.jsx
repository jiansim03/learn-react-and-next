import "./TodoList.css";
import TodoItem from "./TodoItem";
import { useState, useMemo } from "react";

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

  // Todo 전체 리스트, 완료된 항목, 미완료 항목 각각에 대해 개수 리턴
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // 최적화시키고 싶은 연산
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length; // isDone이 true인 것의 lenㅎth
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="TodoList">
      <h4>Todos</h4>
      <div>전체: {totalCount}</div>
      <div>완료: {doneCount}</div>
      <div>미완: {notDoneCount}</div>
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
