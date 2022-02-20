import React from "react";
import ErrorLayout from "layouts/ErrorLayout";

const Custom500 = () => {
  return (
    <ErrorLayout
      title="Ошибка 500"
      desc={
        <span>
          Внутренняя <br /> проблема сервера
        </span>
      }
    />
  );
};

export default Custom500;
