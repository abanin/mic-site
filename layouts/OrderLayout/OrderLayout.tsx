import "react-phone-input-2/lib/style.css";

import React, { FC, FormEvent } from "react";
import PhoneInput from "react-phone-input-2";
import useReducerAsState from "hooks/useReducerAsState";

import Button from "@/components/Button";
import Container from "@/components/Container";
import H1 from "@/components/H1";
import H3 from "@/components/H3";
import Input from "@/components/Input";

import styles from "./styles.module.scss";

type Props = {
  title: string;
  desc: string;
  onSubmit: (params: { fio: string; phone: string; email: string }) => void;
};

type State = {
  fio: string;
  phone: string;
  email: string;
};
const OrderLayout: FC<Props> = ({ title, desc, onSubmit, children }) => {
  const [state, setState] = useReducerAsState<State>({
    fio: "",
    phone: "",
    email: "",
  });

  const { phone, fio, email } = state;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit({ fio, email, phone });
  };

  return (
    <Container className={styles.container}>
      <H1 className={styles.h1}>{title}</H1>
      <p className={styles.desc}>{desc}</p>
      {children}
      <H3 className={styles.h3}>Данные контактного лица</H3>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          className={styles.input}
          placeholder="ФИО"
          onChange={(e) => {
            setState({
              fio: e.target.value.trim(),
            });
          }}
        />
        <Input
          className={styles.input}
          type="email"
          placeholder="Email"
          onChange={(e) => {
            setState({
              email: e.target.value.trim(),
            });
          }}
        />
        <PhoneInput
          containerClass={styles.phone}
          disableDropdown
          countryCodeEditable={false}
          country={"ru"}
          onlyCountries={["ru"]}
          placeholder="Телефон"
          onChange={(value) => {
            setState({ phone: value });
          }}
        />
        <Button
          className={styles.btn}
          type="submit"
          disabled={!fio.length || phone.length < 11 || !email.length}
        >
          Отправить запрос
        </Button>
        <span className={styles.disclaimer}>
          Отправляя запрос, вы соглашаетесь с прохождением обучения
        </span>
      </form>
    </Container>
  );
};

export default OrderLayout;
