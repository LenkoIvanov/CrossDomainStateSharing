import { CartItem } from "@/types/CartItem";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartState {
  cartItems: CartItem[];
}

interface AddItemPayload {
  item: CartItem;
  iframeEventDispatchFlag: boolean;
}

interface DeleteItemPayload {
  itemId: string;
  iframeEventDispatchFlag: boolean;
}

interface UpdateItemQuantityPayload {
  itemId: string;
  quantity: number;
  iframeEventDispatchFlag: boolean;
}

interface LoadItemsPayload {
  items: CartItem[];
  iframeEventDispatchFlag: boolean;
}

const initState: CartState = {
  cartItems: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState: initState,
  reducers: {
    addItem: (state, action: PayloadAction<AddItemPayload>) => {
      const newItem = action.payload.item;
      state.cartItems.push(newItem);
      return state;
    },
    deleteItem: (state, action: PayloadAction<DeleteItemPayload>) => {
      const idToDelete = action.payload.itemId;
      const newCartState = state.cartItems.filter(
        (item) => item.id !== idToDelete
      );
      state.cartItems = newCartState;
      return state;
    },
    updateItemQuantity: (
      state,
      action: PayloadAction<UpdateItemQuantityPayload>
    ) => {
      const idxOfItem = state.cartItems.findIndex(
        (item) => item.id === action.payload.itemId
      );
      if (idxOfItem !== -1)
        state.cartItems[idxOfItem].quantity = action.payload.quantity;
      return state;
    },
    loadItems: (state, action: PayloadAction<LoadItemsPayload>) => {
      state.cartItems = action.payload.items;
      return state;
    },
  },
});

export const { reducer: cartReducer, actions: cartActions } = cartSlice;
