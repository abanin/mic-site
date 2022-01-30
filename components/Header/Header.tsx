import React, { CSSProperties } from "react";
import cn from "classnames";

import Container from "../Container";
import Icon from "../Icon";
import Link from "../Link";
import Logo from "../Logo";

import styles from "./styles.module.scss";

type Props = {
  className?: string;
  style?: CSSProperties;
};

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

const Header = ({ className, style }: Props) => {
  const visibleItems = PAGES;
  return (
    <nav style={style} className={cn(className, styles.nav)}>
      <Container className={styles.container}>
        <Logo className={styles.logo} />
        <ul className={styles.list}>
          {visibleItems.map((item) => {
            return (
              <li key={item.href} className={styles.item}>
                <Link className={styles.navLink} href={item.href}>
                  {item.title}
                </Link>
              </li>
            );
          })}
        </ul>
        <Link href="#lk" className={styles.user}>
          <Icon iconName="user" />
        </Link>
      </Container>
    </nav>
  );
};

export default Header;
