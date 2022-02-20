import React from "react";
import ErrorLayout from "layouts/ErrorLayout";

const Custom404 = () => {
  return (
    <ErrorLayout
      title="Ошибка 404"
      desc={
        <span>
          К сожалению, <br /> этой страницы пока нет{" "}
        </span>
      }
    />
  );
};

export default Custom404;
