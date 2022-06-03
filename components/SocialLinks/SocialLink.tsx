import React, { CSSProperties } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { toast } from "react-toastify";
import cn from "classnames";
import Link from "next/link";

import useFooterQuery, { FooterResponse } from "api/useFooterQuery";
import Icon, { IconType } from "../Icon";
import StyledLink from "../StyledLink";

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
          if (link.key === "email")
            return (
              <CopyToClipboard
                text={socialLinksQuery.data[link.key]}
                onCopy={() =>
                  toast.success("Почта была скопирована в ваш буфер обмена")
                }
              >
                <li key={link.key} className={styles.socialItem}>
                  <StyledLink className={styles.socialLink}>
                    <Icon classNameSvg={styles.svg} iconName={link.iconName} />
                  </StyledLink>
                </li>
              </CopyToClipboard>
            );
          return (
            <li key={link.key} className={styles.socialItem}>
              <Link passHref href={href}>
                <StyledLink className={styles.socialLink}>
                  <Icon classNameSvg={styles.svg} iconName={link.iconName} />
                </StyledLink>
              </Link>
            </li>
          );
        })}
    </ul>
  );
};

export default SocialLink;
