import React, { CSSProperties } from "react";
import cn from "classnames";
import Link from "next/link";

import Container from "../Container";
import Icon from "../Icon";
import Logo from "../Logo";
import StyledLink from "../StyledLink";

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
                <Link passHref href={item.href}>
                  <StyledLink className={styles.navLink}>
                    {item.title}
                  </StyledLink>
                </Link>
              </li>
            );
          })}
        </ul>
        <Link passHref href="#lk">
          <StyledLink className={styles.user}>
            <Icon classNameSvg={styles.svg} iconName="user" />
          </StyledLink>
        </Link>
      </Container>
    </nav>
  );
};

export default Header;
