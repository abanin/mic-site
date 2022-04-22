import React, {
  CSSProperties,
  FC,
  PropsWithChildren,
  ReactElement,
} from "react";
import cn from "classnames";

import styles from "./styles.module.scss";

type Props = {
  children: ReactElement<{ className?: string; style?: CSSProperties }>;
  height?: CSSProperties["height"];
  lineClamp?: CSSProperties["lineClamp"];
};

const LineClamp = ({ children, height = "11.2em", lineClamp = 8 }: Props) => {
  const style: CSSProperties & {
    "--lineClampHeight": CSSProperties["height"];
    "--lineClamp": CSSProperties["lineClamp"];
  } = {
    ...children.props.style,
    "--lineClampHeight": height,
    "--lineClamp": lineClamp,
  };
  return React.cloneElement(children, {
    ...children.props,
    style,
    className: cn(children.props.className, styles.lineClamp),
  });
};

export default LineClamp;
