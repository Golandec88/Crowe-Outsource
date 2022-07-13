import { useEffect, useState } from "react";
import { callbackType } from "@store/types";

export default function useScroller(
  eventHeight: number,
  callback: callbackType,
  condition = (event: number, curr: number): boolean => event >= curr
) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const onScroll = () => setOffset(window.pageYOffset);

    window.removeEventListener("scroll", onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (callback && condition(eventHeight, offset)) callback();
  }, [callback, condition, eventHeight, offset]);
  // eEffect(
  //   (val) => {
  //     if (callback && condition(eventHeight, val)) callback();
  //   },
  //   [callback, condition, eventHeight, offset]
  // );

  return offset;
}
