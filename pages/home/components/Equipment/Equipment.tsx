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
import EquipmentPng from "./equipment.png";

import styles from "./styles.module.scss";

const EQUIPMENT = [
  {
    title: "Название оборудования",
    imgSrc: EquipmentPng,
  },
  {
    title: "Название оборудования1",
    imgSrc: EquipmentPng,
  },
  {
    title: "Название оборудования2",
    imgSrc: EquipmentPng,
  },
  {
    title: "Название оборудования3",
    imgSrc: EquipmentPng,
  },
];

const Equipment = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);
  return (
    <Section
      title="Оборудование"
      desc="Мы предоставим все необходимые инструменты для реализации твоих идей"
      className={styles.equipment}
    >
      <div style={{ position: "relative" }}>
        <Swiper
          modules={[Navigation, Pagination]}
          pagination={{
            el,
            type: "bullets",
            bulletClass: stylesPagination.dot,
            bulletActiveClass: stylesPagination.dotActive,
            clickable: true,
            currentClass: "",
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
          {EQUIPMENT.map(({ title, imgSrc }) => {
            return (
              <SwiperSlide key={title}>
                <Link href={"/#"} passHref>
                  <a>
                    <CommonCard
                      mediaSrc={imgSrc.src}
                      desc="Lorem ipsum dolor sit."
                      title={title}
                    />
                  </a>
                </Link>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <SwiperPagination
          ref={(element) => {
            setEl(element);
          }}
        />
      </div>

      <Button className={styles.btn}>Смотреть всё оборудование</Button>
    </Section>
  );
};

export default Equipment;
