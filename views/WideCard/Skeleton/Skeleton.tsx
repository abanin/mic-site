import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./styles.module.scss";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <ContentLoader viewBox="0 0 270 430">
        <rect x="0" y="0" rx="30" ry="30" width="270" height="430" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
