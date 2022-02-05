import React from "react";

import useFooterQuery from "api/useFooterQuery";
import Container from "../Container";
import Icon, { IconType } from "../Icon";
import Link from "../Link";
import Logo from "../Logo";
import SocialLinks from "../SocialLinks";

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
    title: "Студенту",
    href: "/students",
  },
  {
    title: "Лаборатории",
    href: "/labs",
  },
  {
    title: "Мероприятия",
    href: "/events",
  },
  {
    title: "Контакты",
    href: "/contacts",
  },
];

const Footer = () => {
  const footerQuery = useFooterQuery({
    select: ({ data }) => data.attributes.footer,
  });

  return (
    <footer className={styles.footer}>
      <Container>
        <Logo className={styles.logo} />
        <div className={styles.main}>
          {footerQuery.isSuccess && (
            <>
              <ul className={styles.stat}>
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
              </ul>
              <ul className={styles.pages}>
                {PAGES.map((page) => {
                  return (
                    <li key={page.href} className={styles.pageItem}>
                      <Link className={styles.pageLink} href={page.href}>
                        {page.title}
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
