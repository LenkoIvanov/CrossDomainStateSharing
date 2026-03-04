import { Dispatch } from "@reduxjs/toolkit";
import { fetchCartDataFromCache } from "./localService";
import { loadCartItems } from "@/store/cart/operations";

export const getSseUrl = (sessionId: string) => {
  return `${process.env.NEXT_PUBLIC_BASE_URL}/stream/${sessionId}`;
};

export const handleServerRefresh = async (
  sessionId: string,
  dispatch: Dispatch
) => {
  console.log("SSE triggered update");
  const itemsFromCache = await fetchCartDataFromCache(sessionId);
  if (itemsFromCache) {
    loadCartItems(dispatch)(itemsFromCache);
  }
  console.log("Received items after broadcast: ", itemsFromCache);
};

export const handleSSEConnectionError = (
  error: Event,
  eventSource: EventSource
) => {
  console.log("SSE Connection failed:", error);

  if (eventSource.readyState === EventSource.CLOSED) {
    console.log("SSE Connection was closed.");
  }
};
