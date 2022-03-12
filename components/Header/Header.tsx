import React, { CSSProperties, useState } from "react";
import { useMedia } from "react-use";
import cn from "classnames";
import Hamburger from "hamburger-react";
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
    href: "/home#student",
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
    href: "/home#contacts",
  },
];

const Header = ({ className, style }: Props) => {
  const visibleItems = PAGES;
  const [isOpen, setIsOpen] = useState(false);

  const isMobileMenuVisible = useMedia("(max-width: 992px)", false);

  return (
    <nav style={style} className={cn(className, styles.nav)}>
      <Container className={styles.container}>
        <Logo className={styles.logo} />
        {!isMobileMenuVisible && (
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
        )}

        <div className={styles.buttons}>
          {isMobileMenuVisible && (
            <div className={styles.hamburger}>
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
          )}
        </div>
      </Container>
    </nav>
  );
};

export default Header;
