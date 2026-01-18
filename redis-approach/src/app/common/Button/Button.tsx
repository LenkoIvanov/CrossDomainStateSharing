import { ReactNode } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  children: ReactNode;
  type: "primary" | "secondary";
  isActive?: boolean;
  onClick?: () => void;
}

const Button = (props: ButtonProps) => {
  const { children, type, isActive, onClick } = props;

  return (
    <button
      onClick={onClick}
      className={` ${styles.button} ${
        type === "primary" ? styles.primary : styles.secondary
      } ${isActive && styles.isActive}`}
    >
      {children}
    </button>
  );
};

export default Button;
