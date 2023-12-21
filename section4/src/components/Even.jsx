import { useEffect } from "react";

export default function Even() {
  const tag = "[Even]";
  useEffect(
    () => () => {
      console.log(tag, "언마운트");
    },
    []
  );

  useEffect(() => {
    console.log(tag, "마운트");
  }, []);

  return <div>짝수입니다</div>;
}
