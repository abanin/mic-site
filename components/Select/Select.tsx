import { useState } from "react";
import cn from "classnames";
import useClickOutside from "hooks/useClickOutside";

import { renderSelectControl } from "./helpers/renderSelectControl";
import { renderSelectDropdown } from "./helpers/renderSelectDropdown";
import * as T from "./types";
import useSelect from "./useSelect";

import controlStyles from "./helpers/styles.module.scss";
import styles from "./styles.module.scss";

const Select = <Value,>({
  className,

  disabled,
  label,
  selectedOption,
  defaultOption,

  options,

  onChange: onChangeProp,

  keyAccessor,
  valueFormatter,
  optionFormatter = valueFormatter,

  onClose,

  renderDropdown = renderSelectDropdown,
  renderControl = renderSelectControl,

  portal = false,

  shouldCloseOnOutsideClick = true,
}: T.SelectProps<Value>) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
    opened && onClose?.();
  };

  const handleChange: T.Change<Value> = ({ selectedOptions }) => {
    onChangeProp(selectedOptions[0]);
    toggleOpened();
  };

  const { onChange, selectedOptions, valid } = useSelect<Value>({
    disabled,
    options,
    defaultSelectedOptions: defaultOption ? [defaultOption] : undefined,
    selectedOptions: selectedOption ? [selectedOption] : undefined,
    onChange: handleChange,
    keyAccessor,
  });

  const ref = useClickOutside<HTMLDivElement>((e) => {
    const target = e.target as HTMLElement | null;
    if (
      !target?.closest(`.${controlStyles.dropdown}`) &&
      shouldCloseOnOutsideClick
    )
      setOpened(false);

    onClose?.();
  });

  const cls = cn(className, styles.select);
  return (
    <div className={cls} ref={ref} role="listbox">
      {renderControl({
        opened,
        disabled,
        selectedOption: selectedOptions[0],
        valid,
        onClick: toggleOpened,
        valueFormatter,
        label,
      })}
      {renderDropdown({
        disabled,
        portal,
        valid,
        options,
        selectedOption: selectedOptions[0],
        onChange,
        keyAccessor,
        optionFormatter,
        opened,
      })}
    </div>
  );
};

export default Select;
