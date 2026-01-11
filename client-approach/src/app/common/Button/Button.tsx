import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { children, type, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={` ${styles.button} ${
        type === "primary" ? styles.primary : styles.secondary
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
