import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import { useMedia } from "react-use";
import imageLoader from "helpers/imageLoader";
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
import { useEventsQuery } from "api/events/useEventsQuery";

import styles from "./styles.module.scss";

const Events = () => {
  const [el, setEl] = useState<null | HTMLDivElement>(null);
  const isMobile = useMedia("(max-width: 768px)", false);

  const eventsQuery = useEventsQuery({
    select: ({ data }) => data,
  });

  const events = eventsQuery.isSuccess
    ? eventsQuery.data.filter((event) => event.attributes.type === "event")
    : [];
  const olympics = eventsQuery.isSuccess
    ? eventsQuery.data.filter(
        (event) => event.attributes.type === "olympicOrConference"
      )
    : [];
  const competitions = eventsQuery.isSuccess
    ? eventsQuery.data.filter(
        (event) => event.attributes.type === "competition"
      )
    : [];

  const educationPrograms = eventsQuery.isSuccess
    ? eventsQuery.data.filter(
        (event) => event.attributes.type === "educationProgram"
      )
    : [];

  const eventsTypes = [
    {
      name: "events",
      title: "Мероприятия МИЦ",
      image: "/home/badge.png",
      items: events,
    },
    {
      name: "olympics",
      title: "Олимпиады и конференции",
      image: "/home/pen.png",
      items: olympics,
    },
    {
      name: "competitions",
      title: "Проектные конкурсы",
      image: "/home/quadro.png",
      items: competitions,
    },
    {
      name: "educationPrograms",
      title: "Образовательные программы",
      image: "/home/book.png",
      items: educationPrograms,
    },
  ];

  return (
    <Section
      title="Мероприятия"
      desc="Проходи образовательные курсы и участвуй в олимпиадах"
    >
      {!isMobile && (
        <div className={styles.cards}>
          {eventsTypes.map((type) => {
            return type.items.length ? (
              <Card
                key={type.title}
                className={styles.card}
                style={{
                  backgroundImage: `url(/home/eventsPattern.svg)`,
                }}
              >
                <span className={styles.title}>{type.title}</span>
                <ul className={styles.eventList}>
                  {type.items.map((event) => {
                    return (
                      <li key={event.attributes.name} className={styles.event}>
                        <Link
                          passHref
                          href={`/events/${event.attributes.slug}`}
                        >
                          <StyledLink className={styles.link}>
                            {event.attributes.name}
                          </StyledLink>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
                <Link passHref href={`/events?open=${type.name}`}>
                  <StyledLink className={styles.link}>Смотреть все</StyledLink>
                </Link>
                <div className={styles.image}>
                  <Image
                    loader={imageLoader}
                    layout="fill"
                    src={type.image}
                    alt={type.title}
                  />
                </div>
              </Card>
            ) : null;
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
              {eventsTypes.map((type) => {
                return type.items.length ? (
                  <SwiperSlide key={type.title}>
                    <Card
                      className={styles.card}
                      style={{
                        backgroundImage: `url(/home/eventsPattern.svg)`,
                      }}
                    >
                      <span className={styles.title}>{type.title}</span>
                      <ul className={styles.eventList}>
                        {type.items.map((event) => (
                          <li
                            key={event.attributes.name}
                            className={styles.event}
                          >
                            <Link
                              passHref
                              href={`/events/${event.attributes.slug}`}
                            >
                              <StyledLink className={styles.link}>
                                {event.attributes.name}
                              </StyledLink>
                            </Link>
                          </li>
                        ))}
                      </ul>
                      <Link passHref href={`/events?open=${type.name}`}>
                        <StyledLink className={styles.link}>
                          Смотреть все
                        </StyledLink>
                      </Link>
                      <div className={styles.image}>
                        <Image
                          loader={imageLoader}
                          layout="fill"
                          src={type.image}
                          alt={type.title}
                        />
                      </div>
                    </Card>
                  </SwiperSlide>
                ) : null;
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
