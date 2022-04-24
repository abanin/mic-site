import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import createImageUrl from "helpers/createImageUrl";
import createUrl from "helpers/createUrl";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import WideCard from "views/WideCard";

import Button from "@/components/Button";
import Section from "@/components/Section";
import SwiperNavigation, {
  useSwiperNavigationArrows,
} from "@/components/SwiperNavigation";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import { useInfiniteLabsQuery } from "api/labs/useInfiniteLabsQuery";

import styles from "./styles.module.scss";

const Labs = () => {
  const [el, setEl] = useState<HTMLDivElement | null>(null);

  const [prevRef, nextRef] = useSwiperNavigationArrows();

  const infLabsQuery = useInfiniteLabsQuery({
    searchValue: "",
  });

  const labs = infLabsQuery.isSuccess
    ? infLabsQuery.data.pages.flatMap((page) => page.data)
    : null;

  return (
    <Section
      title="Лаборатории"
      desc="Наши партнеры, открывающие больше возможностей"
      className={styles.labs}
      titleHref="/labs"
    >
      <div style={{ position: "relative" }}>
        <SwiperNavigation prevArrowRef={prevRef} nextArrowRef={nextRef} />
        {labs && (
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
            navigation={{
              prevEl: prevRef.current,
              nextEl: nextRef.current,
              disabledClass:
                labs?.length < 5 ? "arrow-disabled-all" : "arrow-disabled",
            }}
            className={styles.swiper}
            spaceBetween={50}
            slidesPerView={1}
            slidesPerGroup={4}
            breakpoints={{
              576: {
                slidesPerGroup: 1,
                slidesPerView: 2,
                spaceBetween: 15,
              },
              768: {
                slidesPerView: 4,
              },
            }}
          >
            {infLabsQuery.isSuccess &&
              labs?.map((lab) => {
                return (
                  <SwiperSlide className={styles.swiperSlide} key={lab.id}>
                    <Link href={`/labs/${lab.id}`} passHref>
                      <a>
                        <WideCard
                          imageSrc={createImageUrl(
                            lab.attributes.previewImage.data.attributes.url
                          )}
                          desc={lab.attributes.description}
                          title={lab.attributes.name}
                        />
                      </a>
                    </Link>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}

        <SwiperPagination ref={(el) => setEl(el)} />
      </div>
      <Link href="/labs">
        <a>
          <Button className={styles.btn}>Смотреть все лаборатории</Button>
        </a>
      </Link>
    </Section>
  );
};

export default Labs;
