import { useState, useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import TodoEditor from "./components/TodoEditor";
import TodoList from "./components/TodoList";

const mockData = [
  {
    id: 0,
    isDone: true,
    content: "React 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "빨래 널기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: true,
    content: "피아노 연습하기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockData);
  const idRef = useRef(3);

  const onCreate = (content) => {
    const newTodo = {
      id: idRef.current++,
      isDone: false,
      content,
      createdDate: new Date().getTime(),
    };

    setTodos([newTodo, ...todos]);
  };

  // 체크박스 업데이트시
  const onUpdate = (targetID) => {
    setTodos(
      todos.map((todo) => {
        if (todo.id === targetID) {
          return {
            ...todo,
            isDone: !todo.isDone,
          };
        } else return todo;
      })
    );
  };

  // 삭제 기능
  const onDelete = (targetId) => {
    setTodos(todos.filter((todo) => todo.id !== targetId));
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todos={todos} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
