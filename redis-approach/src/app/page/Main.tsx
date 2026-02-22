"use client";

import { useEffect } from "react";
import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";
import {
  fetchCartDataFromCache,
  postCartDataToCache,
} from "@/api/localService";

const Main = () => {
  useEffect(() => {
    const dummyPost = async () => {
      await postCartDataToCache("jds34njh234324", [
        { itemId: "w4234324", itemQty: 3 },
      ]);
    };

    const dummyFetch = async () => {
      await fetchCartDataFromCache("jds34njh234324");
    };

    dummyPost().then(dummyFetch);
  }, []);

  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
