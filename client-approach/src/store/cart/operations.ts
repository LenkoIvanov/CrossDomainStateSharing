import { CartItem } from "@/types/CartItem";
import { cartActions } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { store } from "../store";

export const addNewCartItem = (dispatch: Dispatch) => {
  return (newItem: CartItem) => {
    const matchingItemInState = store
      .getState()
      .cart.cartItems.find((item) => item.id === newItem.id);
    console.log(matchingItemInState);
    if (matchingItemInState) {
      return dispatch(
        cartActions.updateItemQuantity({
          itemId: newItem.id,
          quantity: matchingItemInState.quantity + 1,
        })
      );
    }
    dispatch(cartActions.addItem({ item: newItem }));
  };
};

export const deleteCartItem = (dispatch: Dispatch) => {
  return (itemId: string) => {
    dispatch(cartActions.deleteItem({ itemId: itemId }));
  };
};

export const updateCartItemQuantity = (dispatch: Dispatch) => {
  return (itemId: string, newQuantity: number) => {
    if (newQuantity === 0) dispatch(cartActions.deleteItem({ itemId: itemId }));
    dispatch(
      cartActions.updateItemQuantity({ itemId: itemId, quantity: newQuantity })
    );
  };
};

export const loadCartItems = (dispatch: Dispatch) => {
  return (cartItems: CartItem[]) => {
    dispatch(cartActions.loadItems({ items: cartItems }));
  };
};
