import "./TodoItem.css";
import { memo, useContext, useState } from "react";
import { TodoDispatchContext } from "./TodoContext";

function TodoItem({ id, isDone, isEditing, createdDate, content }) {
  const { onUpdate, onDelete, clickEdit, onEdit } =
    useContext(TodoDispatchContext);

  const [textVal, setTextVal] = useState("");

  // 체크박스 선택 시 핸들러
  const onChangeCheckbox = () => {
    onUpdate(id); // 해당 리스트의 아이디를 전달
  };

  // 삭제 버튼 클릭 시 핸들러
  const onClickDelete = () => {
    onDelete(id);
  };

  // 수정 버튼 클릭시
  const onClickEdit = () => {
    clickEdit(id); // 화면의 투두 text를 input로 전환
    setTextVal(content); // 수정 input을 해당 투두 텍스트로 채움
  };

  // 수정 인풋 변경 시
  const onTextChange = (e) => {
    if (textVal.length > 15) {
      alert("15자 이상 입력할 수 없어요 :(");
      return;
    }
    setTextVal(e.target.value);
  };

  // 수정 완료 버튼 누를 시
  const onEditDone = () => {
    // isEditing을 false로 전환
    clickEdit(id);
    // content를 textVal의 내용으로 변경
    onEdit(id, textVal);
  };

  // 엔터 눌러도 수정 가능하게 하기
  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onEditDone();
    }
  };

  return (
    <div className="TodoItem">
      <input
        // style={{ zoom: 2.0 }}
        type="checkbox"
        checked={isDone}
        onChange={onChangeCheckbox}
      />
      {isEditing ? (
        <>
          <input
            type="text"
            value={textVal}
            onChange={onTextChange}
            onSubmit={onEdit}
            style={{ flex: 1 }}
            onKeyDown={onKeyDown}
          />
          <button id="edit" onClick={onEditDone}>
            변경
          </button>
        </>
      ) : (
        <>
          <div className="contentGroup">
            <div className="content">{content}</div>
            <div className="date">
              {new Date(createdDate).toLocaleDateString()}
            </div>
          </div>
          {/* 타임스탬프를 Date객체로 변환 */}
          <button id="delete" onClick={onClickDelete}>
            삭제
          </button>
          <button id="edit" onClick={onClickEdit}>
            수정
          </button>
        </>
      )}
    </div>
  );
}

export default memo(TodoItem);
