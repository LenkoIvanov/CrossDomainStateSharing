import { AppState } from "../store"

export function selectCartItems(state: AppState) {
    return state.cart.cartItems;
}