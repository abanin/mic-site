import React, { CSSProperties } from "react";
import cn from "classnames";

import Icon, { IconType } from "../Icon";
import Link from "../Link";

import styles from "./styles.module.scss";

const SOCIAL_LINKS: {
  iconName: IconType;
  href: string;
}[] = [
  { iconName: "phone", href: "#" },
  { iconName: "mail", href: "#" },
  { iconName: "telegram", href: "#" },
  { iconName: "vk", href: "#" },
  { iconName: "instagram", href: "#" },
];

type Props = {
  className?: string;
  style?: CSSProperties;
  theme?: "light" | "dark";
};

const SocialLink = ({ className, style, theme = "light" }: Props) => {
  return (
    <ul style={style} className={cn(styles.social, className, styles[theme])}>
      {SOCIAL_LINKS.map((link) => {
        return (
          <li key={link.href} className={styles.socialItem}>
            <Link href={link.href} className={styles.socialLink}>
              <Icon iconName={link.iconName} />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialLink;
