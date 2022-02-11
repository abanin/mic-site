import "swiper/css/navigation";
import "swiper/css/pagination";

import React, { forwardRef } from "react";

import styles from "./styles.module.scss";

const SwiperPagination = forwardRef<HTMLDivElement>((props, ref) => {
  return <div className={styles.pagination} ref={ref} />;
});

SwiperPagination.displayName = "SwiperPagination";

export default SwiperPagination;
