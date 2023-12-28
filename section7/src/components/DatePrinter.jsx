import "./DatePrinter.css";
import { memo } from "react";

function DatePrinter() {
  return (
    <div className="DatePrinter">
      <h1>{new Date().toDateString()}</h1>
    </div>
  );
}

export default memo(DatePrinter);
