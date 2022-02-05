import "swiper/css";
import "swiper/css/pagination";

import React from "react";
import cn from "classnames";
import Image from "next/image";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Arrow from "@/components/Arrow";
import Button from "@/components/Button";
import Card from "@/components/Card";
import H3 from "@/components/H3";
import Icon, { IconType } from "@/components/Icon";
import Link from "@/components/Link";
import Section from "@/components/Section";
import AvatarPng from "./avatar.png";

import styles from "./styles.module.scss";

const FEATURES = [
  "Найти команду для реализации интересных проектов",
  "Выполнять заказы по производству от компаний партнёров",
  "Обучиться навыкам разработки проектов и работе на различном оборудовании",
  "Присоединиться к перспективным проектам",
];

const LINKS: { iconName: IconType; title: string; href: string }[] = [
  {
    title: "Хочу узнать какие в университете есть научные центры",
    href: "#",
    iconName: "fill",
  },
  {
    title: "Узнать об образовательных программах",
    href: "#",
    iconName: "books",
  },
  { title: "Хочу стать частью МИЦ", href: "#", iconName: "home" },
];

const Students = () => {
  return (
    <Section
      title="Студенту"
      desc="Присоединяясь к нашему центру, ты получаешь возможность"
    >
      <div className={styles.main}>
        <div className={styles.image}>
          <Image
            width={371}
            height={354}
            src="/home/students.svg"
            alt="students"
          />
        </div>

        <ul className={styles.featureList}>
          {FEATURES.map((feature, index) => {
            return (
              <li key={feature} className={styles.feature}>
                <span
                  className={cn(styles.count, index === 0 && styles.firstCount)}
                >
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                {feature}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.cardList}>
        {LINKS.map(({ href, iconName, title }) => {
          return (
            <Link key={iconName} className={styles.link} href={href}>
              <Card className={styles.card}>
                <Icon
                  size={32}
                  className={styles.icon}
                  classNameSvg={styles.svg}
                  iconName={iconName}
                />
                <span className={styles.title}>{title}</span>
              </Card>
            </Link>
          );
        })}
      </div>

      <H3 className={styles.h3}>Истории наших выпускников</H3>

      <div style={{ position: "relative" }}>
        <Arrow left className={styles.left} />
        <Arrow right className={styles.right} />
        <div className={styles.pagination} />
        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            prevEl: `.${styles.left}`,
            nextEl: `.${styles.right}`,
          }}
          pagination={{
            el: `.${styles.pagination}`,
            type: "bullets",
            bulletClass: styles.dot,
            bulletActiveClass: styles.dotActive,
            clickable: true,
          }}
          className={styles.swiper}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
          onSwiper={(swiper) => console.log(swiper)}
        >
          <SwiperSlide className={styles.swiperSlide}>
            <Card className={styles.story}>
              <div className={styles.avatar}>
                <Image
                  width={120}
                  height={120}
                  src={AvatarPng.src}
                  alt="avatar"
                />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>Фамилия Имя Отчество</span>
                <span className={styles.job}>Специальность</span>
                <p className={styles.desc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                  nisl, in consectetur est suscipit venenatis facilisis.
                  Imperdiet bibendum fringilla curabitur arcu, velit blandit ac
                  sagittis enim. Lobortis congue pharetra, imperdiet tellus dui
                  integer mauris pellentesque malesuada. Urna, ipsum id vitae
                  condimentum. Id quis tincidunt luctus in neque, tellus urna,
                  ultricies. Adipiscing id eu facilisis feugiat consectetur.
                  Tristique quis velit odio pellentesque eget tristique
                  tristique quis. Purus sem in sit fermentum id adipiscing
                  posuere id. Non consectetur leo quis feugiat non, senectus eu.
                  Convallis.
                </p>
              </div>
              <Button className={styles.btn}>Подробнее</Button>
            </Card>
          </SwiperSlide>
          <SwiperSlide>
            <Card className={styles.story}>
              <div className={styles.avatar}>
                <Image
                  width={120}
                  height={120}
                  src={AvatarPng.src}
                  alt="avatar"
                />
              </div>
              <div className={styles.info}>
                <span className={styles.name}>Фамилия Имя Отчество</span>
                <span className={styles.job}>Специальность</span>
                <p className={styles.desc}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget
                  nisl, in consectetur est suscipit venenatis facilisis.
                  Imperdiet bibendum fringilla curabitur arcu, velit blandit ac
                  sagittis enim. Lobortis congue pharetra, imperdiet tellus dui
                  integer mauris pellentesque malesuada. Urna, ipsum id vitae
                  condimentum. Id quis tincidunt luctus in neque, tellus urna,
                  ultricies. Adipiscing id eu facilisis feugiat consectetur.
                  Tristique quis velit odio pellentesque eget tristique
                  tristique quis. Purus sem in sit fermentum id adipiscing
                  posuere id. Non consectetur leo quis feugiat non, senectus eu.
                  Convallis.
                </p>
              </div>
              <Button className={styles.btn}>Подробнее</Button>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </Section>
  );
};

export default Students;
