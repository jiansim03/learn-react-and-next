import "./HeaderCounter.css";
import { useCallback, useContext, useMemo } from "react";
import { TodoStateContext } from "./TodoContext";

export default function HeaderCounter() {
  const todos = useContext(TodoStateContext);

  // Todo 전체 리스트, 완료된 항목, 미완료 항목 각각에 대해 개수 리턴
  const { totalCount, doneCount, notDoneCount } = useMemo(() => {
    // 최적화시키고 싶은 연산
    const totalCount = todos.length;
    const doneCount = todos.filter((todo) => todo.isDone).length; // isDone이 true인 것의 length
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todos]);

  return (
    <div className="CounterWrap">
      <div className="CounterBox">
        <h1>{totalCount}</h1>
        <p>전체</p>
      </div>
      <div className="CounterBox">
        <h1>{doneCount}</h1>
        <p>완료</p>
      </div>
      <div className="CounterBox">
        {" "}
        <h1>{notDoneCount}</h1>
        <p>미완료</p>
      </div>
    </div>
  );
}
