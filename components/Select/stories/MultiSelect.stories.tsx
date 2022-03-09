import { ComponentProps } from "react";
import { useState } from "@storybook/addons";
import { Meta, Story } from "@storybook/react";

import { MultiSelect, MultiSelectProps } from "..";

export default {
  title: "Components/MultiSelect",
  component: MultiSelect,
  argTypes: {
    ui: {
      options: ["hydrogen", "helium"],
      control: { type: "radio" },
    },
  },
} as Meta<MultiSelectProps<string>>;

const options = ["1", "2", "3", "4", "5"];

const Template: Story<MultiSelectProps<string>> = (args) => {
  return <MultiSelect {...args} />;
};

export const Default = Template.bind({});
Default.args = {
  keyAccessor: (option) => option,
  valueFormatter: (options) =>
    options.length ? `Selected ${options.length}` : `Nothing`,
  optionFormatter: (option) => option,
  options,
  onChange: () => {
    //
  },
};

export const Playground = Template.bind({});
Playground.args = {
  ...Default.args,
  className: "customClassName",
  label: "Label",

  options,

  onReset: () => {
    // console.log("reset");
  },
  onClose: () => {
    // console.log("onClose");
  },

  portal: false,
};
