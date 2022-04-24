import React, { useEffect } from "react";

import Arrow from "../Arrow";

import styles from "./styles.module.scss";

type Props = {
  prevArrowRef: React.RefObject<HTMLDivElement>;
  nextArrowRef: React.RefObject<HTMLDivElement>;
};

const SwiperNavigation = ({ nextArrowRef, prevArrowRef }: Props) => {
  return (
    <>
      <Arrow className={styles.prev} ref={prevArrowRef} left />
      <Arrow className={styles.next} ref={nextArrowRef} right />
    </>
  );
};

export default SwiperNavigation;
