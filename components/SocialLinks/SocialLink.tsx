import React, { CSSProperties } from "react";
import cn from "classnames";

import useFooterQuery, { FooterResponse } from "api/useFooterQuery";
import Icon, { IconType } from "../Icon";
import Link from "../Link";

import styles from "./styles.module.scss";

const SOCIAL_LINKS: {
  key: keyof FooterResponse["data"]["attributes"]["footer"]["socialLinks"];
  iconName: IconType;
  prefix?: string;
}[] = [
  { key: "phone", iconName: "phone", prefix: "tel:" },
  { key: "email", iconName: "mail", prefix: "mailto:" },
  { key: "telegram", iconName: "telegram" },
  { key: "vk", iconName: "vk" },
  { key: "instagram", iconName: "instagram" },
];

type Props = {
  className?: string;
  style?: CSSProperties;
  theme?: "light" | "dark";
};

const SocialLink = ({ className, style, theme = "light" }: Props) => {
  const socialLinksQuery = useFooterQuery({
    select: ({ data }) => data.attributes.footer.socialLinks,
  });

  return (
    <ul style={style} className={cn(styles.social, className, styles[theme])}>
      {socialLinksQuery.isSuccess &&
        SOCIAL_LINKS.map((link) => {
          const prefix = link.prefix ?? "";
          const href = `${prefix}${socialLinksQuery.data[link.key]}`;
          return (
            <li key={link.key} className={styles.socialItem}>
              <Link href={href} className={styles.socialLink}>
                <Icon classNameSvg={styles.svg} iconName={link.iconName} />
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default SocialLink;
