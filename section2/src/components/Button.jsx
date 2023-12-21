import "./Button.css";

export default function Button({ text, color, children }) {
  console.log(children);

  const onClick = (e) => {
    console.log(e);
  };

  return (
    <button
      onClick={onClick}
      className="button"
      style={{ backgroundColor: color }}
    >
      {children}
    </button>
  );
}
