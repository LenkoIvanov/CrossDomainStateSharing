import { Product } from "../types/Product";

export const products: Product[] = [
  {
    id: "1123011",
    name: "Macbook Pro M4",
    price: 2499.0,
    categoryId: "1123",
    altText: "A Macbook laptop",
    imageUrl: "/mac-stock.jpg",
  },
  {
    id: "1211001",
    name: "The Lord of the Rings",
    price: 14.99,
    categoryId: "1211",
    altText: "Lord of the Rings by J.R.R. Tolkien",
    imageUrl: "/lotr-stock.webp",
  },
  {
    id: "1211009",
    name: "Solaris",
    price: 9.99,
    categoryId: "1211",
    altText: "Solaris by Stanislav Lem",
    imageUrl: "/solaris-stock.jpg",
  },
  {
    id: "1124002",
    name: "Logitech MS Keys Mini",
    price: 59.99,
    categoryId: "1124",
    altText: "A Logitech keyboard",
    imageUrl: "/keyboard-stock.png",
  },
  {
    id: "1124003",
    name: "Logitech G305",
    price: 35.99,
    categoryId: "1124",
    altText: "A Logitech mouse",
    imageUrl: "/mouse-stock.webp",
  },
  {
    id: "1125006",
    name: "Doom",
    price: 19.99,
    categoryId: "1125",
    altText: "Doom 1994",
    imageUrl: "/doom-stock.png",
  },
];
