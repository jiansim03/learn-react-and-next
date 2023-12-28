import { useState, useRef, useReducer, useCallback, useMemo } from "react";
import "./App.css";
import DatePrinter from "./components/DatePrinter";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";
import {
  TodoStateContext,
  TodoDispatchContext,
} from "./components/TodoContext";
import HeaderCounter from "./components/HeaderCounter";

const mockData = [
  {
    id: 0,
    isDone: true,
    isEditing: false,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    isEditing: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: true,
    isEditing: false,
    content: "피아노 연습하기",
    createdDate: new Date().getTime(),
  },
];

function reducer(state, action) {
  switch (action.type) {
    // Todo 목록 추가
    case "CREATE": {
      return [action.data, ...state];
    }

    // Todo 체크박스 토글
    case "UPDATE": {
      // 인자로 전달받은 id값과 같은 항목일 경우에만 isDone항목을 바꾼다.
      return state.map((it) =>
        it.id === action.data ? { ...it, isDone: !it.isDone } : it
      );
    }

    // Todo 삭제
    case "DELETE": {
      return state.filter((it) => it.id !== action.data);
    }

    case "SWITCHEDIT": {
      // targetID와 일치하는 state의 todo의 content 찾아 내용 바꾼다
      return state.map((it) =>
        it.id === action.data ? { ...it, isEditing: !it.isEditing } : it
      );
    }

    // 수정 완료 시 변경된 내용을 전달받아 content 프로퍼티에 저장
    case "EDIT": {
      return state.map((it) =>
        it.id === action.data.targetId
          ? { ...it, content: action.data.content }
          : it
      );
    }
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, mockData);

  const idRef = useRef(3);
  // Todo 목록 추가 시
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        isDone: false,
        isEditing: false,
        content,
        createdDate: new Date().getTime(),
      },
    });
  };

  // 체크박스 업데이트시
  const onUpdate = useCallback((targetId) => {
    dispatch({
      type: "UPDATE",
      data: targetId,
    });
  }, []);

  // 삭제 기능
  const onDelete = useCallback((targetId) => {
    dispatch({
      type: "DELETE",
      data: targetId,
    });
  }, []);

  // 수정 기능
  const onEdit = useCallback((targetId, content) => {
    dispatch({
      type: "EDIT",
      data: { targetId, content },
    });
  }, []);

  const clickEdit = useCallback((targetId) => {
    dispatch({
      type: "SWITCHEDIT",
      data: targetId,
    });
  }, []);

  // 특정 함수들이 재생성되지 않도록 처리해준다
  const memoizedDispatches = useMemo(() => {
    return {
      onCreate,
      onUpdate,
      onDelete,
      onEdit,
      clickEdit,
    };
  }, []);

  return (
    <div className="App">
      <TodoStateContext.Provider value={todos}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <div className="Header">
            <DatePrinter />
            <TodoEditor />
            <HeaderCounter value={todos} />
          </div>
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
