import { useState } from "react";
import { Meta } from "@storybook/react";

import Select from "../Select";

export default {
  title: "Components/Select/UI",
  component: Select,
} as Meta;

const options = [{ id: 1 }, { id: 2 }];

const onChange = () => {
  //
};

const keyAccessor = (opt: { id: number }) => opt.id;
const formatter = (opt: { id: number }) => opt.id;

export const Hydrogen = () => {
  const [selectedOption, setSelectOption] = useState({ id: 1 });
  return (
    <Select
      options={options}
      onChange={setSelectOption}
      selectedOption={selectedOption}
      keyAccessor={keyAccessor}
      valueFormatter={formatter}
    />
  );
};
