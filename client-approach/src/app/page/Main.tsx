"use client";

import { useEffect } from "react";
import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";
import { CartItem } from "@/types/CartItem";
import { fetchFromLocalStorage } from "@/utils/localStorage";
import { useDispatch } from "react-redux";
import { loadCartItems } from "@/store/cart/operations";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const localStorageCartItems: CartItem[] = fetchFromLocalStorage();
    if (localStorageCartItems.length)
      loadCartItems(dispatch)(localStorageCartItems);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
