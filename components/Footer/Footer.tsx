import React from "react";

import Container from "../Container";
import Icon, { IconType } from "../Icon";
import Link from "../Link";
import Logo from "../Logo";
import SocialLinks from "../SocialLinks";

import styles from "./styles.module.scss";

const STAT = [
  {
    count: 153,
    title: "Реализованные проекты",
  },
  {
    count: 1050,
    title: "Прошли курсы",
  },
  {
    count: 685,
    title: "Занимаются проектами",
  },
];

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
  return (
    <footer className={styles.footer}>
      <Container>
        <Logo className={styles.logo} />
        <div className={styles.main}>
          <ul className={styles.stat}>
            {STAT.map((item) => {
              return (
                <li key={item.title} className={styles.statItem}>
                  <span className={styles.statCount}>{item.count}</span>
                  <span className={styles.statTitle}>{item.title}</span>
                </li>
              );
            })}
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
                г. Москва, ул. 2-я <br /> Бауманская, д. 5, к. 5
              </span>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
