import React, { CSSProperties } from "react";
import classNames from "classnames";
import Link from "next/link";

import useFooterQuery from "api/useFooterQuery";
import Container from "../Container";
import Icon from "../Icon";
import Logo from "../Logo";
import SocialLinks from "../SocialLinks";
import StyledLink from "../StyledLink";

import styles from "./styles.module.scss";

const PAGES = [
  {
    title: "Главная",
    href: "/",
  },
  {
    title: "Проекты",
    href: "/projects",
  },
  {
    title: "Оборудование",
    href: "/equipments",
  },
  {
    title: "Лаборатории",
    href: "/labs",
  },
  {
    title: "Мероприятия",
    href: "/events",
  },
];

type Props = {
  className?: string;
  style?: CSSProperties;
};

const Footer = ({ className, style }: Props) => {
  const footerQuery = useFooterQuery({
    select: ({ data }) => data.attributes.footer,
  });

  return (
    <footer style={style} className={classNames(styles.footer, className)}>
      <Container className={styles.container}>
        <Logo className={styles.logo} />
        <div className={styles.main}>
          {footerQuery.isSuccess && (
            <>
              {/* <ul className={styles.stat}>
                <li className={styles.statItem}>
                  <span className={styles.statCount}>
                    {footerQuery.data.implementedProjectsCount}
                  </span>
                  <span className={styles.statTitle}>
                    Реализованные проекты
                  </span>
                </li>
                <li className={styles.statItem}>
                  <span className={styles.statCount}>
                    {footerQuery.data.peopleCompletedCoursesNumber}
                  </span>
                  <span className={styles.statTitle}>Прошли курсы</span>
                </li>
                <li className={styles.statItem}>
                  <span className={styles.statCount}>
                    {footerQuery.data.peopleInvolvedInProjectsNumber}
                  </span>
                  <span className={styles.statTitle}>Занимаются проектами</span>
                </li>
              </ul> */}
              <ul className={styles.pages}>
                {PAGES.map((page) => {
                  return (
                    <li key={page.href} className={styles.pageItem}>
                      <Link passHref href={page.href}>
                        <StyledLink className={styles.pageLink}>
                          {page.title}
                        </StyledLink>
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className={styles.contacts}>
                <SocialLinks />
                <div className={styles.address}>
                  <Icon
                    size={32}
                    iconName="map-point"
                    className={styles.addressIcon}
                  />
                  <span className={styles.addressTitle}>
                    {footerQuery.data.address}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
