import "./TodoItem.css";
import { memo } from "react";

function TodoItem({ id, isDone, createdDate, content, onUpdate, onDelete }) {
  // 체크박스 선택 시 핸들러
  const onChangeCheckbox = () => {
    onUpdate(id); // 해당 리스트의 아이디를 전달
  };

  // 삭제 버튼 클릭 시 핸들러
  const onClickDelete = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <input type="checkbox" checked={isDone} onChange={onChangeCheckbox} />
      <div className="content">{content}</div>
      {/* 타임스탬프를 Date객체로 변환 */}
      <div className="date">{new Date(createdDate).toLocaleDateString()}</div>
      <button onClick={onClickDelete}>삭제</button>
    </div>
  );
}

export default memo(TodoItem);
