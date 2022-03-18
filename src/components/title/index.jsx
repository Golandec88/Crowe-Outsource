import proptypes from "prop-types";
import s from "./style.module.scss";

export default function Title({ text, size }) {
  return <>
    <h4 className={`${s.title} ${s["size-" + size]}`}>{text}</h4>
  </>;
}

Title.propTypes = {
  text: proptypes.string,
  size: proptypes.string
};
Title.defaultProps = {
  text: "Title",
  size: "medium"
};
