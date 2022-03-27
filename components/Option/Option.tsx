import cn from "classnames";

import Icon from "../Icon";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  selected?: boolean;
};

type NativeProps = Omit<
  React.DetailedHTMLProps<React.LiHTMLAttributes<HTMLLIElement>, HTMLLIElement>,
  keyof Props
>;

const Option: React.FC<Props & NativeProps> = ({
  className,
  selected,
  children,
  ...nativeLiProps
}) => {
  const cls = cn(className, styles.option, selected && styles.selected);

  return (
    <li className={cls} {...nativeLiProps}>
      {selected && (
        <Icon
          iconName="check"
          className={styles.check}
          classNameSvg={styles.checkSvg}
        />
      )}
      <div className={styles.value}>{children}</div>
    </li>
  );
};

export default Option;
