import s from "./style.module.scss";
import React from "react";

interface Props {
  text?: string;
  size?: string;
}

const Title: React.FC<Props> = ({ text = "Title", size = "medium" }) => {
  return (
    <>
      <h4
        className={`${s.title} ${s["size-" + size]}`}
        data-testid="title-test"
      >
        {text}
      </h4>
    </>
  );
};
export default Title;
