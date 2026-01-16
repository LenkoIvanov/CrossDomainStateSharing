"use client"

import { useEffect } from "react";
import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";
import { addNewCartItem } from "@/store/cart/operations";
import { products } from "../resources/products";
import { CartItem } from "@/types/CartItem";
import { useDispatch } from "react-redux";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const dummy: CartItem = {
      ...products[0], quantity: 117,
    }
    console.log(dummy)
    addNewCartItem(dispatch)(dummy);
  }, [])

  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
