import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import createImageUrl from "helpers/createImageUrl";
import stringCutter from "helpers/stringCutter";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CommonCard from "views/CommonCard";

import Button from "@/components/Button";
import Section from "@/components/Section";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import { useInfiniteEquipmentsQuery } from "api/equipment/useInfiniteEqupmentsQuery";
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

  const infEquipmentQuery = useInfiniteEquipmentsQuery();

  const equipments = infEquipmentQuery.isSuccess
    ? infEquipmentQuery.data.pages.flatMap((page) => page.data)
    : null;
  return (
    <Section
      title="Оборудование"
      titleHref="/equipments"
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
          {equipments &&
            equipments.map(({ id, attributes }) => {
              return (
                <SwiperSlide key={id}>
                  <Link href={`/equipments/${id}`} passHref>
                    <a>
                      <CommonCard
                        className={styles.card}
                        mediaSrc={createImageUrl(
                          attributes.avatar.data.attributes.url
                        )}
                        desc={stringCutter(attributes.description, 200)}
                        title={attributes.name}
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

      <Link href="/equipments" passHref>
        <a>
          <Button className={styles.btn}>Смотреть всё оборудование</Button>
        </a>
      </Link>
    </Section>
  );
};

export default Equipment;
