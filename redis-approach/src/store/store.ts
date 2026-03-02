import { configureStore } from "@reduxjs/toolkit";
import { cartReducer } from "./cart/slice";
import { dispatchUpdateToServer } from "./middleware/dispatchUpdateToServer";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(dispatchUpdateToServer);
  },
});

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;
