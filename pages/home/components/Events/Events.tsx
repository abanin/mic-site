import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import { useMedia } from "react-use";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "@/components/Card";
import Section from "@/components/Section";
import StyledLink from "@/components/StyledLink";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import QuadrocopterPng from "./quadro.png";

import styles from "./styles.module.scss";

const EVENTS_TYPES = [
  {
    title: "Мероприятия МИЦ",
    events: [
      {
        name: "Мероприятие 1",
        href: "#",
      },
      {
        name: "Мероприятие 2",
        href: "#",
      },
      {
        name: "Мероприятие 3",
        href: "#",
      },
      {
        name: "Мероприятие 4",
        href: "#",
      },
    ],
  },
  {
    title: "Олимпиады и конференции",
    events: [
      {
        name: "Олимпиада 1",
        href: "#",
      },
      {
        name: "Олимпиада 2",
        href: "#",
      },
      {
        name: "Олимпиада 3",
        href: "#",
      },
      {
        name: "Олимпиада 4",
        href: "#",
      },
    ],
  },
  {
    title: "Проектные конкурсы",
    events: [
      {
        name: "Конкурс 1",
        href: "#",
      },
      {
        name: "Конкурс 2",
        href: "#",
      },
      {
        name: "Конкурс 3",
        href: "#",
      },
      {
        name: "Конкурс 4",
        href: "#",
      },
    ],
  },
  {
    title: "Образовательные программы",
    events: [
      {
        name: "Онлайн-курсы",
        href: "#",
      },
      {
        name: "Программа 1",
        href: "#",
      },
      {
        name: "Программа 2",
        href: "#",
      },
      {
        name: "Программа 3",
        href: "#",
      },
    ],
  },
];

const Events = () => {
  const [el, setEl] = useState<null | HTMLDivElement>(null);
  const isMobile = useMedia("(max-width: 768px)", false);
  return (
    <Section
      title="Мероприятия"
      desc="Проходи образовательные курсы и участвуй в олимпиадах"
    >
      {!isMobile && (
        <div className={styles.cards}>
          {EVENTS_TYPES.map((type) => {
            return (
              <Card
                key={type.title}
                className={styles.card}
                style={{
                  backgroundImage: `url(/home/eventsPattern.svg)`,
                }}
              >
                <span className={styles.title}>{type.title}</span>
                <ul className={styles.eventList}>
                  {type.events.map((event) => {
                    return (
                      <li key={event.name} className={styles.event}>
                        <Link passHref href={event.href}>
                          <StyledLink className={styles.link}>
                            {event.name}
                          </StyledLink>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link passHref href="#">
                  <StyledLink className={styles.link}>Смотреть все</StyledLink>
                </Link>
                <div className={styles.image}>
                  <Image
                    width={210}
                    height={119}
                    src={QuadrocopterPng.src}
                    alt="quadro"
                  />
                </div>
              </Card>
            );
          })}
        </div>
      )}
      {isMobile && (
        <div style={{ position: "relative" }}>
          {el && (
            <Swiper
              modules={[Navigation, Pagination]}
              pagination={{
                el,
                currentClass: "",
                type: "bullets",
                bulletClass: stylesPagination.dot,
                bulletActiveClass: stylesPagination.dotActive,
                clickable: true,
              }}
              className={styles.swiper}
              spaceBetween={30}
              slidesPerView={1}
              breakpoints={{
                576: {
                  slidesPerView: 2,
                  spaceBetween: 15,
                },
                768: {
                  slidesPerView: 4,
                },
              }}
            >
              {EVENTS_TYPES.map((type) => {
                return (
                  <SwiperSlide key={type.title}>
                    <Card
                      className={styles.card}
                      style={{
                        backgroundImage: `url(/home/eventsPattern.svg)`,
                      }}
                    >
                      <span className={styles.title}>{type.title}</span>
                      <ul className={styles.eventList}>
                        {type.events.map((event) => {
                          return (
                            <li key={event.name} className={styles.event}>
                              <Link passHref href={event.href}>
                                <StyledLink className={styles.link}>
                                  {event.name}
                                </StyledLink>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                      <Link passHref href="#">
                        <StyledLink className={styles.link}>
                          Смотреть все
                        </StyledLink>
                      </Link>
                      <div className={styles.image}>
                        <Image
                          width={210}
                          height={119}
                          src={QuadrocopterPng.src}
                          alt="quadro"
                        />
                      </div>
                    </Card>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          )}
          <SwiperPagination ref={(el) => setEl(el)} />
        </div>
      )}
    </Section>
  );
};

export default Events;
