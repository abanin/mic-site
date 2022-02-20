import { useState } from "react";
import cn from "classnames";

import useClickOutside from "../../hooks/useClickOutside";
import { renderSelectMultiControl } from "./helpers/renderSelectControl";
import { renderMultiSelectDropdown } from "./helpers/renderSelectDropdown";
import * as T from "./types";
import useSelect from "./useSelect";

import controlStyles from "./helpers/styles.module.scss";
import styles from "./styles.module.scss";

const MultiSelect = <Value,>({
  className,
  selectedOptions: selectedOptionsProp,
  defaultOptions,
  label,

  options,
  disabled,

  onChange: onChangeProp,
  onReset: onResetProp,
  onClose,

  renderDropdown = renderMultiSelectDropdown,
  renderControl = renderSelectMultiControl,

  keyAccessor,
  optionFormatter,
  valueFormatter,

  portal,
}: T.MultiSelectProps<Value>) => {
  const [opened, setOpened] = useState(false);

  const toggleOpened = () => {
    setOpened(!opened);
    opened && onClose?.();
  };

  const handleChange: T.Change<Value> = ({ selectedOptions }) => {
    onChangeProp(selectedOptions);
  };

  const { onChange, selectedOptions, valid, onReset, selectAll } =
    useSelect<Value>({
      multi: true,
      options,
      defaultSelectedOptions: defaultOptions ?? undefined,
      selectedOptions: selectedOptionsProp ?? undefined,
      onChange: handleChange,
      onReset: onResetProp,
      keyAccessor,
    });

  const ref = useClickOutside<HTMLDivElement>((e: Event) => {
    const target = e.target as HTMLElement | null;
    if (!target?.closest(`.${controlStyles.dropdown}`)) setOpened(false);
    onClose?.();
  });

  const cls = cn(className, styles.multiSelect);
  return (
    <div role="listbox" className={cls} ref={ref}>
      {renderControl({
        selectedOptions: selectedOptions,
        label,
        valid,
        onClick: toggleOpened,
        valueFormatter,
        disabled,
      })}
      {opened &&
        renderDropdown({
          selectAll,
          keyAccessor,
          optionFormatter,
          valid,
          portal,
          options,
          selectedOptions: selectedOptions,
          onChange,
          onReset,
          opened,
        })}
    </div>
  );
};

export default MultiSelect;
