import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLEAR_MESSAGE } from "@modules/global/types";

export default function () {
  const dispatch = useDispatch();
  const { text, type } = useSelector(({ global }) => global.message);
  const [model, setModel] = useState(false);

  useEffect(() => {
    if(text) {
      setModel(true);

      const timeout = setTimeout(() => {
        setModel(false);
        dispatch({ type: CLEAR_MESSAGE });
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [text, type, setModel, dispatch]);

  return [text, type, model];
}
