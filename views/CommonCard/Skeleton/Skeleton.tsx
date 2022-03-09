import React from "react";
import ContentLoader from "react-content-loader";

import styles from "./styles.module.scss";

const Skeleton = () => {
  return (
    <div className={styles.skeleton}>
      <ContentLoader viewBox="0 0 240 340">
        <rect x="0" y="0" rx="30" ry="30" width="240" height="200" />
        <rect x="0" y="220" rx="30" ry="30" width="240" height="30" />
        <rect x="0" y="265" rx="30" ry="30" width="240" height="30" />
        <rect x="0" y="310" rx="30" ry="30" width="240" height="30" />
      </ContentLoader>
    </div>
  );
};

export default Skeleton;
