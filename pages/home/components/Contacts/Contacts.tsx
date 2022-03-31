import React from "react";
import imageLoader from "helpers/imageLoader";
import Image from "next/image";

import Card from "@/components/Card";
import Section from "@/components/Section";
import SocialLinks from "@/components/SocialLinks";

import styles from "./styles.module.scss";

const Contacts = () => {
  return (
    <Section id="contacts" title="Контакты" className={styles.contracts}>
      <Card className={styles.card}>
        <div className={styles.info}>
          <h3 className={styles.h3}>У вас остались вопросы?</h3>
          <SocialLinks
            className={styles.social}
            theme="dark"
            style={{ marginTop: 24 }}
          />
        </div>

        <div
          className={styles.map}
          style={{
            position: "relative",
            overflow: "hidden",
          }}
        >
          <a
            href="https://yandex.ru/maps/213/moscow/?utm_medium=mapframe&utm_source=maps"
            className={styles.yandexHref}
          >
            Москва
          </a>
          <a
            href="https://yandex.ru/maps/213/moscow/?ll=37.686528%2C55.766279&mode=routes&rtext=55.772409%2C37.679042~55.766205%2C37.684443&rtt=pd&ruri=ymapsbm1%3A%2F%2Ftransit%2Fstop%3Fid%3Dstation__10095100~&utm_medium=mapframe&utm_source=maps&z=16.72"
            className={styles.yandexLabel}
          >
            Яндекс.Карты
          </a>
          <iframe
            className={styles.iframe}
            src="https://yandex.ru/map-widget/v1/-/CCU5YUv3-C"
            width="560"
            height="400"
            frameBorder="1"
            allowFullScreen={true}
            style={{ position: "relative" }}
          ></iframe>
        </div>

        <div className={styles.image}>
          <Image
            loader={imageLoader}
            width={418}
            height={248}
            src="/home/contacts.svg"
            alt="picture"
          />
        </div>
      </Card>
    </Section>
  );
};

export default Contacts;
