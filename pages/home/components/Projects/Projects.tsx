import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CommonCard from "views/CommonCard";

import Button from "@/components/Button";
import Section from "@/components/Section";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import Tabs from "@/components/Tabs";
import projectPng from "./projectCardDumb.png";

import styles from "./styles.module.scss";

const TABS = ["Завершённые", "В разработке", "Заявки на проекты"];

const PROJECTS = [
  {
    title: "Название проекта",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
  {
    title: "Название проекта1",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
  {
    title: "Название проекта2",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
  {
    title: "Название проекта3",
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Euismod nunc risus nisl viverra in cursus posuere. Fringilla suscipit vel integer ipsum, quis. Est blandit.",
    imgSrc: projectPng,
  },
];

const Projects = () => {
  const [el, setEl] = useState<null | HTMLDivElement>(null);
  return (
    <Section
      title="Проекты"
      titleHref="/projects"
      desc="Идеи, которые воплощаются в жизнь"
      className={styles.projects}
    >
      <Tabs
        className={styles.tabs}
        tabs={TABS}
        defaultActiveTab={TABS[0]}
        keyAccessor={(tab) => tab}
        valueFormatter={(tab) => tab}
      />
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
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
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
            {PROJECTS.map(({ title, desc, imgSrc }) => {
              return (
                <SwiperSlide className={styles.swiperSlide} key={title}>
                  <Link href={"/#"} passHref>
                    <a>
                      <CommonCard
                        title={title}
                        desc={desc}
                        mediaSrc={imgSrc.src}
                      />
                    </a>
                  </Link>
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

      <Button className={styles.btn}>Создать свой проект</Button>
    </Section>
  );
};

export default Projects;
