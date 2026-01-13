import LinkButton from "@/app/common/LinkButton/LinkButton";
import styles from "./Header.module.scss";
import Button from "@/app/common/Button/Button";

const Header = () => {
  return (
    <header className={styles.header}>
      <h1>Client sub-domain</h1>
      <div className={styles.elementsContainer}>
        <div className={styles.linkContainer}>
          <LinkButton href="#" textContent="Home" />
          <LinkButton href="#" textContent="About us" />
          <LinkButton href="#" textContent="Contact us" />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="primary">Register / Log in</Button>
          <div className={styles.cartContainer}>
            <Button type="secondary">Cart</Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
