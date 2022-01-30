import React from "react";
import Image from "next/image";

import Card from "@/components/Card";
import Link from "@/components/Link";
import Section from "@/components/Section";
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
  return (
    <Section
      title="Мероприятия"
      desc="Проходи образовательные курсы и участвуй в олимпиадах"
    >
      <div className={styles.cards}>
        {EVENTS_TYPES.map((type) => {
          return (
            <Card
              className={styles.card}
              key={type.title}
              style={{ backgroundImage: `url(/home/eventsPattern.svg)` }}
            >
              <span className={styles.title}>{type.title}</span>
              <ul className={styles.eventList}>
                {type.events.map((event) => {
                  return (
                    <li key={event.name} className={styles.event}>
                      <Link href={event.href}>{event.name}</Link>
                    </li>
                  );
                })}
              </ul>
              <Link href="#" className={styles.link}>
                Смотреть все
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
    </Section>
  );
};

export default Events;
