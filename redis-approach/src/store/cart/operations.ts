import { CartItem } from "@/types/CartItem";
import { cartActions } from "./slice";
import { Dispatch } from "@reduxjs/toolkit";
import { store } from "../store";
import { APICartData } from "@/api/localService";
import { products } from "@/app/resources/products";

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
          shouldPostUpdateFlag: true,
        })
      );
    }
    dispatch(
      cartActions.addItem({ item: newItem, shouldPostUpdateFlag: true })
    );
  };
};

export const deleteCartItem = (dispatch: Dispatch) => {
  return (itemId: string) => {
    dispatch(
      cartActions.deleteItem({ itemId: itemId, shouldPostUpdateFlag: true })
    );
  };
};

export const updateCartItemQuantity = (dispatch: Dispatch) => {
  return (itemId: string, newQuantity: number) => {
    if (newQuantity === 0)
      dispatch(
        cartActions.deleteItem({
          itemId: itemId,
          shouldPostUpdateFlag: true,
        })
      );
    dispatch(
      cartActions.updateItemQuantity({
        itemId: itemId,
        quantity: newQuantity,
        shouldPostUpdateFlag: true,
      })
    );
  };
};

export const loadCartItems = (dispatch: Dispatch) => {
  return (apiCartItems: APICartData[]) => {
    const cartItems: CartItem[] = apiCartItems.flatMap((apiItem) => {
      const productInfo = products.find(
        (product) => product.id === apiItem.itemId
      );

      if (productInfo) {
        return [
          {
            ...productInfo,
            quantity: apiItem.itemQty,
          },
        ];
      }

      return [];
    });

    dispatch(
      cartActions.loadItems({
        cartItems: cartItems,
        shouldPostUpdateFlag: false,
      })
    );
  };
};
