import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React, { useState } from "react";
import createImageUrl from "helpers/createImageUrl";
import Link from "next/link";
import { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import CommonCard from "views/CommonCard";

import Button from "@/components/Button";
import Section from "@/components/Section";
import SwiperPagination, {
  stylesPagination,
} from "@/components/SwiperPagination";
import { useInfiniteProjectsQuery } from "api/project/useInfiniteProjectsQuery";
import useLinksQuery from "api/useLinksQuery";

import styles from "./styles.module.scss";

const Projects = () => {
  const [el, setEl] = useState<null | HTMLDivElement>(null);

  const infProjectsQuery = useInfiniteProjectsQuery();

  const linksQuery = useLinksQuery({
    select: ({ data }) => data.attributes,
  });

  return (
    <Section
      title="Проекты"
      titleHref="/projects"
      desc="Идеи, которые воплощаются в жизнь"
      className={styles.projects}
    >
      <div style={{ position: "relative" }}>
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
            {infProjectsQuery.data.pages.flatMap((page) =>
              page.data.map((item) => {
                const { name, description, image, Slug } = item.attributes;
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
              })
            )}
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
