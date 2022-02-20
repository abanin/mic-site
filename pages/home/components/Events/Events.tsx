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

import styles from "./styles.module.scss";

const EVENTS_TYPES = [
  {
    title: "Мероприятия МИЦ",
    image: "/home/badge.png",
  },
  {
    title: "Олимпиады и конференции",
    image: "/home/pen.png",
  },
  {
    title: "Проектные конкурсы",
    image: "/home/quadro.png",
  },
  {
    title: "Образовательные программы",
    image: "/home/book.png",
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
                  {/* {type.events.map((event) => {
                    return (
                      <li key={event.name} className={styles.event}>
                        <Link passHref href={event.href}>
                          <StyledLink className={styles.link}>
                            {event.name}
                          </StyledLink>
                        </Link>
                      </li>
                    );
                  })} */}
                </ul>
                <Link passHref href="#">
                  <StyledLink className={styles.link}>Смотреть все</StyledLink>
                </Link>
                <div className={styles.image}>
                  <Image layout="fill" src={type.image} alt={type.title} />
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
                      <ul className={styles.eventList}></ul>
                      <Link passHref href="#">
                        <StyledLink className={styles.link}>
                          Смотреть все
                        </StyledLink>
                      </Link>
                      <div className={styles.image}>
                        <Image
                          layout="fill"
                          src={type.image}
                          alt={type.title}
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
