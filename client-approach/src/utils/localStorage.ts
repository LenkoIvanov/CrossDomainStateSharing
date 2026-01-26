import { CartItem } from "@/types/CartItem";

export const localStorageKey = "cartItems";

export const syncLocalStorageState = (cartItems: CartItem[]) => {
  const payload = JSON.stringify(cartItems);
  localStorage.setItem(localStorageKey, payload);
};

export const fetchFromLocalStorage = (): CartItem[] => {
  const localStorageState = localStorage.getItem(localStorageKey);
  const localCartItems: CartItem[] = localStorageState
    ? parseCartItems(localStorageState)
    : [];

  return localCartItems;
};

const parseCartItems = (localContents: string): CartItem[] => {
  return JSON.parse(localContents);
};
