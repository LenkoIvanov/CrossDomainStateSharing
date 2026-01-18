import { CartItem } from "@/types/CartItem";
import { cartActions } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";

export const addNewCartItem = (dispatch: Dispatch) => {
  return (newItem: CartItem) => {
    console.log("invoke?");
    dispatch(cartActions.addItem({ item: newItem }));
  };
};

export const deleteCartItem = () => {
  return (itemId: string) => {
    cartActions.deleteItem({ itemId: itemId });
  };
};

export const updateCartItemQuantity = () => {
  return (itemId: string, newQuantity: number) => {
    cartActions.updateItemQuantity({ itemId: itemId, quantity: newQuantity });
  };
};
