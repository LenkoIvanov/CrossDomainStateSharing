"use client";

import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";

const Main = () => {
  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
