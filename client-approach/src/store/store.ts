import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/slice";
import { updateLocalStorage } from "./middleware/updateLocalStorage";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(updateLocalStorage);
  },
});

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;
