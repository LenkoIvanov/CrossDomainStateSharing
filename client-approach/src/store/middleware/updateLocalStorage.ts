import { Middleware } from "@reduxjs/toolkit";
import { syncLocalStorageState } from "@/utils/localStorage";

export const updateLocalStorage: Middleware = (store) => (next) => (action) => {
  const nextAction = next(action);
  const cartItems = store.getState().cart.cartItems;
  syncLocalStorageState(cartItems);
  return nextAction;
};
