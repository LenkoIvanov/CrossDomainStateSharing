import { CartItem } from "@/types/CartItem";
import { cartActions } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";

export const addNewCartItem = (dispatch: Dispatch) => {
  return (newItem: CartItem) => {
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
