import proptypes from "prop-types";
import s from "./style.module.scss";

const Title = ({ text, size }) => <>
  <h4 className={`${s.title} ${s["size-" + size]}`}>{text}</h4>
</>;

Title.propTypes = {
  text: proptypes.string,
  size: proptypes.string
};
Title.defaultProps = {
  text: "Title",
  size: "medium"
};

export default Title;