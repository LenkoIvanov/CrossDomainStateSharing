"use client";

import { useEffect } from "react";
import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";

const Main = () => {
  useEffect(() => {
    fetch("http://localhost:3001/cartInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: "dsdsdfsdjkfhsdjkhds",
        cartData: [
          {
            id: "wdfjsdkf",
            name: "Default",
            qty: 2,
          },
        ],
      }),
    });
  }, []);

  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
