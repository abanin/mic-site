import { cleanup, render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Select from "../Select";

type T = { id: string; label: string; value: string };

const options: T[] = [
  { id: "1", label: "1", value: "1" },
  { id: "2", label: "2", value: "2" },
  { id: "3", label: "3", value: "3" },
];

const onChange = () => {
  //
};

const keyAccessor = (opt: T) => opt.id;
const formatter = (opt: T) => opt.label;

describe("Select tests", () => {
  afterEach(cleanup);

  test("dropdown should be toggled by user click on control", async () => {
    render(
      <Select
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        optionFormatter={formatter}
        options={options}
        onChange={onChange}
      />,
    );
    const control = screen.getByRole("button");

    userEvent.click(control);
    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();

    userEvent.click(control);
    expect(list).not.toBeInTheDocument();
  });

  test("first option should be selected by default", () => {
    render(
      <Select
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        optionFormatter={formatter}
        options={options}
        onChange={onChange}
      />,
    );
    const control = screen.getByRole("button");
    expect(control).toHaveTextContent(options[0].label);
  });

  test("default option should be equal defaultOption prop", () => {
    render(
      <Select
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        optionFormatter={formatter}
        defaultOption={options[1]}
        options={options}
        onChange={onChange}
      />,
    );

    const control = screen.getByRole("button");
    expect(control).toHaveTextContent(options[1].label);
  });

  test("dropdown should be opened after user click while prop shouldCloseOnOutsideClick should be set in false", () => {
    render(
      <Select
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        optionFormatter={formatter}
        shouldCloseOnOutsideClick={false}
        options={options}
        onChange={onChange}
      />,
    );

    const control = screen.getByRole("button");
    userEvent.click(control);
    const list = screen.getByRole("list");
    userEvent.click(document.body);
    expect(list).toBeInTheDocument();
  });

  test("dropdown shouldn't be opened when select disabled", () => {
    render(
      <Select
        disabled
        options={options}
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        onChange={onChange}
      />,
    );

    const control = screen.getByRole("button");
    userEvent.click(control);
    const list = screen.queryByRole("list");

    expect(list).not.toBeInTheDocument();
  });

  test("option value should be different from value of control when optionsFormatter prop is passed", () => {
    render(
      <Select
        options={options}
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        optionFormatter={(option) => option.label + "1"}
        onChange={onChange}
      />,
    );

    const control = screen.getByRole("button");
    userEvent.click(control);

    const list = screen.getByRole("list");
    expect(list).toBeInTheDocument();
    const opts = screen.getAllByRole("option");
    expect(opts[0]).toHaveTextContent(options[0].label + "1");
    userEvent.click(opts[0]);
    expect(control).toHaveTextContent(options[0].label);
    expect(list).not.toBeInTheDocument();
  });

  test('label should be rendered when "label" prop is passed', () => {
    render(
      <Select
        label="Some label"
        options={options}
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        onChange={onChange}
      />,
    );

    const control = screen.getByRole("button");
    expect(control).toHaveTextContent("Some label");
  });

  test("dropdown should be rendered when portal is used", () => {
    render(
      <Select
        label="Some label"
        portal
        options={options}
        keyAccessor={keyAccessor}
        valueFormatter={formatter}
        onChange={onChange}
      />,
    );

    const control = screen.getByRole("button");
    userEvent.click(control);
    const list = within(document.body).getByRole("list");

    expect(list).toBeInTheDocument();

    userEvent.click(document.body);

    expect(list).not.toBeInTheDocument();
  });
});
