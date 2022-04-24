import React, { FC } from "react";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
import useReducerAsState from "hooks/useReducerAsState";

import Icon from "../Icon";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  isOpen?: boolean;
  isDefaultOpen?: boolean;
  onPanelClick?: () => void;
  title: string;
  keepMount?: boolean;
};

const variants = {
  open: { height: "auto", opacity: 1 },
  collapsed: { height: 0, opacity: 0 },
};

const Disclosure: FC<Props> = ({
  className,
  children,
  title,
  keepMount = false,
  isOpen,
  isDefaultOpen = false,
  onPanelClick,
}) => {
  const [state, setState] = useReducerAsState({
    opened: isDefaultOpen,
  });

  const { opened } = state;

  const isOpened = isOpen ?? opened;

  return (
    <div className={cn(styles.disclosure, className)}>
      <div
        className={styles.panel}
        onClick={() => {
          onPanelClick?.();
          isOpen === undefined && setState({ opened: !opened });
        }}
      >
        <div className={styles.iconWrapper}>
          <Icon
            className={cn(styles.icon, isOpened && styles.iconOpened)}
            iconName="plus"
            classNameSvg={styles.svg}
          />
        </div>

        <span className={styles.title}>{title}</span>
      </div>
      {keepMount ? (
        <motion.div
          animate={isOpened ? "open" : "collapsed"}
          variants={variants}
        >
          {children}
        </motion.div>
      ) : (
        <AnimatePresence>
          {isOpened && (
            <motion.div
              variants={variants}
              initial="collapsed"
              animate="open"
              exit="collapsed"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
};

export default Disclosure;
