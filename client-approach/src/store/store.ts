import { configureStore } from '@reduxjs/toolkit'
import { CartState, cartReducer } from './cart/slice'

interface StoreState {
    cart: CartState;
}

export const store = configureStore<StoreState>({
  reducer: {
    cart: cartReducer,
  },
})

export type GetState = typeof store.getState;
export type AppState = ReturnType<GetState>;