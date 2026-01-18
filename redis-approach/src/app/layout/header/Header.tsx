"use client";

import LinkButton from "@/app/common/LinkButton/LinkButton";
import styles from "./Header.module.scss";
import Button from "@/app/common/Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";
import MiniCart from "./MiniCart/MiniCart";
import { useState } from "react";

const Header = () => {
  const [isCartVisible, setIsCartVisible] = useState<boolean>(false);

  return (
    <header className={styles.header}>
      <h1>Redis sub-domain</h1>
      <div className={styles.elementsContainer}>
        <div className={styles.linkContainer}>
          <LinkButton href="#" textContent="Home" />
          <LinkButton href="#" textContent="About us" />
          <LinkButton href="#" textContent="Contact us" />
        </div>
        <div className={styles.buttonContainer}>
          <Button type="primary">Register / Log in</Button>
          <div className={styles.cartContainer}>
            <Button
              type="secondary"
              onClick={() => setIsCartVisible(true)}
              isActive={isCartVisible}
            >
              <div className={styles.cartBtnContents}>
                <FontAwesomeIcon
                  className={styles.icon}
                  icon={faCartShopping}
                />
                <span>Cart</span>
                <FontAwesomeIcon
                  className={`${styles.icon} ${styles.chevronIcon}`}
                  icon={faChevronDown}
                />
              </div>
            </Button>
            {isCartVisible && (
              <MiniCart onClose={() => setIsCartVisible(false)} />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
