import cn from "classnames";

import Icon from "../../Icon";
import * as T from "../types";

import styles from "./styles.module.scss";

export const renderSelectControl = <Value,>({
  opened,
  disabled,
  valid,
  label,
  onClick,
  valueFormatter,
  selectedOption,
}: T.RenderSelectControlParams<Value>) => {
  return (
    <div
      className={cn(styles.control, disabled && styles.disabled)}
      onClick={onClick}
      role="button"
    >
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.btn}>{valueFormatter(selectedOption)}</div>
    </div>
  );
};

export const renderSelectMultiControl = <Value,>({
  opened,
  disabled,
  valid,
  label,
  onClick,
  valueFormatter,
  selectedOptions,
}: T.RenderMultiSelectControlParams<Value>) => {
  return (
    <div
      role="button"
      className={cn(styles.control, disabled && styles.disabled)}
      onClick={onClick}
    >
      {label && <span className={styles.label}>{label}</span>}
      <div className={styles.btn}>
        {valueFormatter(selectedOptions)}
        <Icon
          iconName="caret"
          className={styles.caret}
          classNameSvg={styles.caretSvg}
        />
      </div>
    </div>
  );
};
