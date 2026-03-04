"use client";

import { useEffect } from "react";
import styles from "./Main.module.scss";
import ProductGrid from "./ProductGrid/ProductGrid";
import SideNavigation from "./SideNavigation/SideNavigation";
import { getSessionIdFromCookie, setSessionIdCookie } from "@/utils/cookies";
import { v4 as uuid } from "uuid";
import { useDispatch } from "react-redux";
import {
  getSseUrl,
  handleSSEConnectionError,
  handleServerRefresh,
} from "@/api/sseService";

const Main = () => {
  const dispatch = useDispatch();

  const handleOnMount = () => {
    const sessionId = getSessionIdFromCookie();

    if (!sessionId) {
      const newSessionId = uuid();
      setSessionIdCookie(newSessionId);
    }
  };

  useEffect(handleOnMount, []);

  useEffect(() => {
    const sessionId = getSessionIdFromCookie();

    if (!sessionId) return;

    const eventSource = new EventSource(getSseUrl(sessionId));

    eventSource.onmessage = async (event) => {
      if (event.data === "refresh") {
        await handleServerRefresh(sessionId, dispatch);
      }
    };

    eventSource.onerror = (error) => {
      handleSSEConnectionError(error, eventSource);
    };

    return () => eventSource.close();
  }, [dispatch]);

  return (
    <section className={styles.mainContainer}>
      <SideNavigation />
      <ProductGrid />
    </section>
  );
};

export default Main;
