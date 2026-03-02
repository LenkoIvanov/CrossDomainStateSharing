"use client";

import { useEffect } from "react";
import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";
import { getSessionIdFromCookie, setSessionIdCookie } from "@/utils/cookies";
import { v4 as uuid } from "uuid";
import { APICartData, fetchCartDataFromCache } from "@/api/localService";
import { useDispatch } from "react-redux";
import { loadCartItems } from "@/store/cart/operations";

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCartOnMount = async (id: string) => {
      const cartData: APICartData[] = await fetchCartDataFromCache(id);
      loadCartItems(dispatch)(cartData);
    };
    const sessionId = getSessionIdFromCookie();

    if (!sessionId) {
      const newSessionId = uuid();
      setSessionIdCookie(newSessionId);
      fetchCartOnMount(newSessionId);
      return;
    }

    fetchCartOnMount(sessionId);
  }, [dispatch]);

  useEffect(() => {
    const sessionId = getSessionIdFromCookie();

    if (!sessionId) return;

    const eventSource = new EventSource(
      `http://localhost:3001/stream/${sessionId}`
    );

    eventSource.onmessage = async (event) => {
      if (event.data === "refresh") {
        console.log("SSE triggered update");
        const itemsFromCache = await fetchCartDataFromCache(sessionId);
        console.log("Received items after broadcast: ", itemsFromCache);
      }
    };

    eventSource.onerror = (error) => {
      console.log("SSE Connection failed:", error);

      if (eventSource.readyState === EventSource.CLOSED) {
        console.log("SSE Connection was closed.");
      }
    };

    return () => eventSource.close();
  }, []);

  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
