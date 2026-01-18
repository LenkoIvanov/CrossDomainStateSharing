import { Product } from "@/types/Product";
import styles from "./ProductCard.module.scss";
import Button from "@/app/common/Button/Button";
import { CartItem } from "@/types/CartItem";
import { addNewCartItem } from "@/store/cart/operations";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const { name, price, imageUrl, altText } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => {
    const cartItem: CartItem = {
      ...product,
      quantity: 1,
    };

    addNewCartItem(dispatch)(cartItem);
  };

  return (
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.productImage}
          src={imageUrl ?? ""}
          alt={altText}
        />
      </div>
      <div className={styles.productInfo}>
        <p className={styles.textContainer}>{name}</p>
        <p className={`${styles.textContainer} ${styles.price}`}>{price}€</p>
        <Button type="primary" onClick={addProductToCart}>
          Add to cart
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
