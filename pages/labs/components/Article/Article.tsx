import React from "react";
import Image from "next/image";

import Container from "@/components/Container";
import H1 from "@/components/H1";
import Icon from "@/components/Icon";
import ImagePng from "./image.png";

import styles from "./styles.module.scss";

const Article = () => {
  return (
    <Container className={styles.article}>
      <div className={styles.sidebar}>
        <Image height={270} width={270} src={ImagePng.src} alt="project" />
        <div className={styles.contacts}>
          <div className={styles.iconWrapper}>
            <Icon classNameSvg={styles.svg} iconName="phone" />
          </div>
          <div style={{ marginLeft: 15 }} className={styles.iconWrapper}>
            <Icon classNameSvg={styles.svg} iconName="mail" />
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <H1>Название Лаборатории</H1>
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
