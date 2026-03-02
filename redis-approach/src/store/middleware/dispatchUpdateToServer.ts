import { APICartData, postCartDataToCache } from "@/api/localService";
import { getSessionIdFromCookie } from "@/utils/cookies";
import { Middleware } from "@reduxjs/toolkit";

export const dispatchUpdateToServer: Middleware =
  (store) => (next) => async (action) => {
    const nextAction = next(action);
    const cartItems = store.getState().cart.cartItems;
    const sessionId = getSessionIdFromCookie();
    if (sessionId) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const cartData: APICartData[] = cartItems.map((cartItem: any) => {
        return {
          itemId: cartItem.id,
          itemQty: cartItem.quantity,
        };
      });
      await postCartDataToCache(sessionId, cartData);
    }
    return nextAction;
  };
