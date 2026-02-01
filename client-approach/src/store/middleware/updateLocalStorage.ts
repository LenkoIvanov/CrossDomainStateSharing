import { Middleware } from "@reduxjs/toolkit";
import { syncLocalStorageState } from "@/utils/localStorage";
import {
  dispatchUpdateEventType,
  shouldDispatchIframeEvent,
} from "@/utils/syncDomains";

export const updateLocalStorage: Middleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  const cartItems = store.getState().cart.cartItems;
  syncLocalStorageState(cartItems);
  if (shouldDispatchIframeEvent(action)) {
    const event = new Event(dispatchUpdateEventType);
    window.dispatchEvent(event);
  }
  return nextAction;
};
