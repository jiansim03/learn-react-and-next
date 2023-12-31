import { useRef, useState, useContext } from "react";
import "./TodoEditor.css";
import { TodoDispatchContext } from "./TodoContext";

export default function TodoEditor() {
  const { onCreate } = useContext(TodoDispatchContext);

  const [content, setContent] = useState("");
  const inputRef = useRef();

  const onChangeContent = (e) => {
    if (e.target.value.length > 15) {
      alert("15자 이상 입력할 수 없어요 :(");
      return;
    }
    setContent(e.target.value);
  };

  const onClick = () => {
    if (content === "") {
      inputRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    // 엔터를 눌렀다면 onClick 메서드 발생시키기
    if (e.keyCode === 13) {
      onClick();
    }
  };

  return (
    <div className="TodoEditor">
      <input
        ref={inputRef}
        type="text"
        placeholder="새로운 Todo..."
        value={content}
        onKeyDown={onKeyDown}
        onChange={onChangeContent}
      />
      <button onClick={onClick}>추가</button>
    </div>
  );
}
