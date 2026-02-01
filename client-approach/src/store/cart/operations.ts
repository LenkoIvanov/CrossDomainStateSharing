import { CartItem } from "@/types/CartItem";
import { cartActions } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { store } from "../store";

export const addNewCartItem = (dispatch: Dispatch) => {
  return (newItem: CartItem) => {
    const matchingItemInState = store
      .getState()
      .cart.cartItems.find((item) => item.id === newItem.id);

    if (matchingItemInState) {
      return dispatch(
        cartActions.updateItemQuantity({
          itemId: newItem.id,
          quantity: matchingItemInState.quantity + 1,
          iframeEventDispatchFlag: true,
        })
      );
    }
    dispatch(
      cartActions.addItem({ item: newItem, iframeEventDispatchFlag: true })
    );
  };
};

export const deleteCartItem = (dispatch: Dispatch) => {
  return (itemId: string) => {
    dispatch(
      cartActions.deleteItem({ itemId: itemId, iframeEventDispatchFlag: true })
    );
  };
};

export const updateCartItemQuantity = (dispatch: Dispatch) => {
  return (itemId: string, newQuantity: number) => {
    if (newQuantity === 0)
      dispatch(
        cartActions.deleteItem({
          itemId: itemId,
          iframeEventDispatchFlag: true,
        })
      );
    dispatch(
      cartActions.updateItemQuantity({
        itemId: itemId,
        quantity: newQuantity,
        iframeEventDispatchFlag: true,
      })
    );
  };
};

export const loadCartItems = (dispatch: Dispatch) => {
  return (cartItems: CartItem[]) => {
    dispatch(
      cartActions.loadItems({
        items: cartItems,
        iframeEventDispatchFlag: false,
      })
    );
  };
};
