import React from "react";
import Image from "next/image";

import Button from "@/components/Button";
import Container from "@/components/Container";
import H1 from "@/components/H1";
import ImagePng from "./image.png";

import styles from "./styles.module.scss";

const Article = () => {
  return (
    <Container className={styles.article}>
      <div className={styles.sidebar}>
        <Image height={270} width={270} src={ImagePng.src} alt="project" />
        <Button className={styles.btn}>Создать свой проект</Button>
      </div>
      <div className={styles.post}>
        <H1>Название проекта</H1>
        <span className={styles.category}>Категория проекта</span>
        <div className={styles.content}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eros est
          mauris tortor, ornare eu, leo purus volutpat. Id dictum fermentum,
          cras tincidunt nullam vitae, rhoncus, volutpat sit. Rutrum sagittis
          ullamcorper scelerisque aenean viverra. Turpis integer est et
          ridiculus. Placerat phasellus molestie elit lacus rutrum justo nec
          vitae. In imperdiet a mattis facilisis scelerisque donec consequat
          erat amet. Donec penatibus dolor vestibulum ullamcorper.
        </div>
      </div>
    </Container>
  );
};

export default Article;
