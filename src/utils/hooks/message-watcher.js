import { useSelector } from "react-redux";
import { useEffect } from "react";

const useMessageWatcher = (setModel) => {
  const message = useSelector(({ global }) => global.message);

  useEffect(() => {
    if(message.text) {
      setModel(true);

      const timeout = setTimeout(() => {
        setModel(false);
      }, 5000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [message]);

  return [message.text, message.type];
};

export default useMessageWatcher;