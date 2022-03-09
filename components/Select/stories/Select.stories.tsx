import { Meta, Story } from "@storybook/react";

import { Select, SelectProps } from "..";

export default {
  title: "Components/Select",
  component: Select,
} as Meta<SelectProps<string>>;

const options = ["1", "2", "3", "4", "5", "6", "7"];

const Template: Story<SelectProps<string>> = (args) => {
  return <Select {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  options,
  keyAccessor: (option) => option,
  valueFormatter: (option) => option,
  onChange: (option) => {
    // console.log(option);
  },
};

export const Playground = Template.bind({});
Playground.args = {
  ...Default.args,
  className: "customClassName",

  disabled: false,
  label: "Label",
  optionFormatter: (option: string) => option,

  onClose: () => {
    // console.log("close");
  },
  portal: false,
  shouldCloseOnOutsideClick: false,
};
