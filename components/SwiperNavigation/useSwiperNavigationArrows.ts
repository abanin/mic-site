import { useRef } from "react";

const useSwiperNavigationArrows = () => {
  const prevArrowRef = useRef<HTMLDivElement>(null);
  const nextArrowRef = useRef<HTMLDivElement>(null);

  return [prevArrowRef, nextArrowRef];
};

export default useSwiperNavigationArrows;
