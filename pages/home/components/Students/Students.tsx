import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import cn from "classnames";
import createImageUrl from "helpers/createImageUrl";
import imageLoader from "helpers/imageLoader";
import Image from "next/image";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import Card from "@/components/Card";
import H3 from "@/components/H3";
import Icon, { IconType } from "@/components/Icon";
import Section from "@/components/Section";
import StyledLink from "@/components/StyledLink";
import SwiperNavigation, {
  useSwiperNavigationArrows,
} from "@/components/SwiperNavigation";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import useStoriesQuery from "api/useSuccessStoriesQuery";

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
    href: "/labs",
    iconName: "fill",
  },
  {
    title: "Узнать об образовательных программах",
    href: "/events",
    iconName: "books",
  },
  {
    title: "Хочу стать частью МИЦ",
    href: "https://forms.gle/7zLbfXmxStQuCGs17",
    iconName: "home",
  },
];

const Students = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  const [prevRef, nextRef] = useSwiperNavigationArrows();

  const storiesQuery = useStoriesQuery({
    select: ({ data }) => data.map((item) => item.attributes),
  });

  return (
    <Section
      id="student"
      title="Студенту"
      desc="Присоединяясь к нашему центру, ты получаешь возможность"
    >
      <div className={styles.main}>
        <div className={styles.image}>
          <Image
            loader={imageLoader}
            layout="fill"
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
            <Link key={iconName} passHref href={href}>
              <StyledLink className={styles.link}>
                <Card className={styles.card}>
                  <Icon
                    size={32}
                    className={styles.icon}
                    classNameSvg={styles.svg}
                    iconName={iconName}
                  />
                  <span className={styles.title}>{title}</span>
                </Card>
              </StyledLink>
            </Link>
          );
        })}
      </div>

      <H3 className={styles.h3}>Истории наших выпускников</H3>

      <div style={{ position: "relative" }}>
        <SwiperNavigation prevArrowRef={prevRef} nextArrowRef={nextRef} />
        {el && storiesQuery.isSuccess && (
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
            spaceBetween={50}
            slidesPerView={1}
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
              disabledClass: "arrow-disabled",
            }}
          >
            {storiesQuery.data.map((item) => {
              return (
                <SwiperSlide key={item.name} className={styles.swiperSlide}>
                  <Card className={styles.story}>
                    <div className={styles.info}>
                      <div className={styles.avatar}>
                        <div className={styles.avatarImage}>
                          <Image
                            loader={imageLoader}
                            layout="fill"
                            src={createImageUrl(
                              item.avatar.data.attributes.url
                            )}
                            alt="avatar"
                          />
                        </div>
                      </div>
                      <div>
                        <span className={styles.name}>{item.name}</span>
                        <span className={styles.job}>{item.position}</span>
                      </div>
                    </div>
                    <p className={styles.desc}>{item.content}</p>
                    {/* <Button className={styles.btn}>Подробнее</Button> */}
                  </Card>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
        <SwiperPagination
          ref={(element) => {
            setEl(element);
          }}
        />
      </div>
    </Section>
  );
};

export default Students;
