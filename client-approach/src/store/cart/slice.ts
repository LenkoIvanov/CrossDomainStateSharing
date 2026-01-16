import { CartItem } from "@/types/CartItem"
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface CartState {
    cartItems: CartItem[];
}

interface AddItemPayload {
    item: CartItem;
}

interface DeleteItemPayload {
    itemId: string;
}

interface UpdateItemQuantityPayload {
    itemId: string;
    quantity: number;
}

const initState: CartState = {
    cartItems: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initState,
    reducers: {
        addItem: (state, action: PayloadAction<AddItemPayload>) => {
            console.log('tuka li si')
            const newItem = action.payload.item;
            state.cartItems.push(newItem)
            return state;
        },
        deleteItem: (state, action: PayloadAction<DeleteItemPayload>) => {
            const idToDelete = action.payload.itemId;
            const newCartState = state.cartItems.filter((item) => item.id !== idToDelete);
            state.cartItems = newCartState;
            return state;
        },
        updateItemQuantity: (state, action: PayloadAction<UpdateItemQuantityPayload>) => {
            const idxOfItem = state.cartItems.findIndex((item) => item.id === action.payload.itemId);
            if( idxOfItem !== -1) state.cartItems[idxOfItem].quantity = action.payload.quantity;
            return state;
        }
    }
  });

  export const { reducer: cartReducer, actions: cartActions } = cartSlice;