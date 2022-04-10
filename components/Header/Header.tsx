import React, { CSSProperties, useState } from "react";
import { useLockBodyScroll, useMedia } from "react-use";
import cn from "classnames";
import { AnimatePresence, motion } from "framer-motion";
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

const variants = {
  visible: { opacity: 1 },
  hidden: { opacity: 0 },
};

const Header = ({ className, style }: Props) => {
  const visibleItems = PAGES;
  const [isOpen, setIsOpen] = useState(false);

  const isMobileMenuVisible = useMedia("(max-width: 992px)", false);

  useLockBodyScroll(isOpen);

  return (
    <>
      {isMobileMenuVisible && (
        <>
          <AnimatePresence>
            {isOpen && (
              <motion.nav
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={variants}
                className={styles.mobileNav}
              >
                <Container>
                  <div>
                    <Logo />
                  </div>

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
                </Container>
              </motion.nav>
            )}
          </AnimatePresence>

          <div className={styles.buttons}>
            <div className={styles.hamburger}>
              <Hamburger toggled={isOpen} toggle={setIsOpen} />
            </div>
          </div>
        </>
      )}
      {!isMobileMenuVisible && (
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
          </Container>
        </nav>
      )}
    </>
  );
};

export default Header;
