import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useRef, useState } from "react";
import createImageUrl from "helpers/createImageUrl";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CommonCard from "views/CommonCard";

import Button from "@/components/Button";
import Section from "@/components/Section";
import SwiperNavigation, {
  useSwiperNavigationArrows,
} from "@/components/SwiperNavigation";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import { useInfiniteProjectsQuery } from "api/project/useInfiniteProjectsQuery";
import useLinksQuery from "api/useLinksQuery";

import styles from "./styles.module.scss";

const Projects = () => {
  const [el, setEl] = useState<null | HTMLDivElement>(null);
  const [prevRef, nextRef] = useSwiperNavigationArrows();

  const infProjectsQuery = useInfiniteProjectsQuery();

  const linksQuery = useLinksQuery({
    select: ({ data }) => data.attributes,
  });

  const projects = infProjectsQuery.isSuccess
    ? infProjectsQuery.data.pages.flatMap((page) =>
        page.data.map((item) => item.attributes)
      )
    : [];

  return (
    <Section
      title="Проекты"
      titleHref="/projects"
      desc="Идеи, которые воплощаются в жизнь"
      className={styles.projects}
    >
      <div style={{ position: "relative" }}>
        <SwiperNavigation prevArrowRef={prevRef} nextArrowRef={nextRef} />
        {el && infProjectsQuery.isSuccess && (
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
              nextEl: nextRef.current,
              prevEl: prevRef.current,
              disabledClass:
                projects.length < 5 ? "arrow-disabled-all" : "arrow-disabled",
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
                slidesPerGroup: 4,
              },
            }}
          >
            {projects.map((project) => {
              const { name, description, image, Slug } = project;
              return (
                <SwiperSlide className={styles.swiperSlide} key={name}>
                  <Link href={`/projects/${Slug}`} passHref>
                    <a>
                      <CommonCard
                        title={name}
                        desc={description}
                        mediaSrc={createImageUrl(image.data.attributes.url)}
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

      {linksQuery.isSuccess && linksQuery.data.createProject && (
        <Link href={linksQuery.data.createProject} passHref>
          <a>
            <Button className={styles.btn}>Создать свой проект</Button>
          </a>
        </Link>
      )}
    </Section>
  );
};

export default Projects;
