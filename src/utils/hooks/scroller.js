import { useEffect, useState } from "react";

export default function useScroller(eventHeight, callback, condition = (event, curr) => event >= curr) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect((val) => {
    if(callback && condition(eventHeight, val)) callback();
  }, [callback, condition, eventHeight, offset]);

  return offset;
}