import { KeyboardEvent } from "react";
import cn from "classnames";

import Option from "../../Option";
import * as T from "../types";

import styles from "./styles.module.scss";

export const renderSelectDropdown = <Value,>({
  disabled,
  options,
  selectedOption,
  onChange,
  portal,
  opened,
  keyAccessor,
  optionFormatter,
}: T.RenderSelectDropdownParams<Value>) => {
  const listOptions = options.map((option) => {
    const selected = keyAccessor(selectedOption) === keyAccessor(option);
    return (
      <Option
        tabIndex={selected ? -1 : 0}
        key={keyAccessor(option)}
        selected={selected}
        onClick={() => {
          onChange(option);
        }}
        onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
          e.code === "Enter" && onChange(option);
        }}
      >
        {optionFormatter(option)}
      </Option>
    );
  });

  return (
    <div className={cn(styles.dropdown)}>
      {!disabled && opened && listOptions}
    </div>
  );
};

export const renderMultiSelectDropdown = <Value,>({
  selectAll,
  options,
  selectedOptions,
  portal,
  onChange,
  onReset,
  keyAccessor,
  optionFormatter,
  opened,
}: T.RenderMultiSelectDropdownParams<Value>) => {
  const listOptions = options.map((option) => {
    const selected = Boolean(
      selectedOptions.find((opt) => keyAccessor(opt) === keyAccessor(option))
    );
    return (
      <Option
        tabIndex={selected ? -1 : 0}
        key={keyAccessor(option)}
        selected={selected}
        onClick={() => {
          onChange(option);
        }}
        onKeyPress={(e: KeyboardEvent<HTMLLIElement>) => {
          e.code === "Enter" && onChange(option);
        }}
      >
        {optionFormatter(option)}
      </Option>
    );
  });

  return (
    <ul className={styles.dropdown}>
      <div className={styles.controls}>
        <span
          className={styles.checkAll}
          onClick={() => {
            selectAll(options);
          }}
        >
          Выбрать все
        </span>
        <span
          role="reset"
          className={styles.resetBtn}
          onClick={() => {
            selectAll([]);
          }}
        >
          Очистить выбор
        </span>
      </div>
      {listOptions}
    </ul>
  );
};
