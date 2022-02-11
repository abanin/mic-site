import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import WideCard from "views/WideCard";

import Button from "@/components/Button";
import Section from "@/components/Section";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import LabPng from "./lab_card.png";

import styles from "./styles.module.scss";

const LABS = [
  {
    title: "Название лаборатории",
    href: LabPng,
  },
  {
    title: "Название лаборатории1",
    href: LabPng,
  },
  {
    title: "Название лаборатории2",
    href: LabPng,
  },
  {
    title: "Название лаборатории3",
    href: LabPng,
  },
];

const Labs = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  return (
    <Section
      title="Лаборатории"
      desc="Наши партнеры, открывающие больше возможностей"
      className={styles.labs}
    >
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
        {LABS.map(({ title, href }) => {
          return (
            <SwiperSlide className={styles.swiperSlide} key={title}>
              <Link href={href.src} passHref>
                <a>
                  <WideCard
                    imageSrc={LabPng.src}
                    desc="Lorem ipsum dolor sit amet."
                    title={title}
                  />
                </a>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <SwiperPagination ref={(el) => setEl(el)} />
      <Button className={styles.btn}>Смотреть все лаборатории</Button>
    </Section>
  );
};

export default Labs;
