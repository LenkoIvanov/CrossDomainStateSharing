import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MiniProduct.module.scss";
import { CartItem } from "@/types/CartItem";
import { useDispatch } from "react-redux";
import {
  deleteCartItem,
  updateCartItemQuantity,
} from "@/store/cart/operations";

interface MiniProductProps {
  product: CartItem;
}

const MiniProduct = ({ product }: MiniProductProps) => {
  const { id, name, imageUrl, price, altText, quantity } = product;
  const dispatch = useDispatch();

  const handleItemValueChange = (newQuantity: number) => {
    updateCartItemQuantity(dispatch)(id, newQuantity);
  };

  const handleItemDeletion = () => {
    deleteCartItem(dispatch)(id);
  };

  return (
    <div className={styles.miniProductContainer}>
      <div className={styles.productImageContainer}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={imageUrl ?? ""}
          alt={altText}
          className={styles.productImage}
        />
      </div>
      <p className={styles.titleContainer}>{name}</p>
      <div className={styles.qtyContainer}>
        <p>{price}€</p>
        <input
          name="product-qty"
          type="number"
          defaultValue={quantity}
          min={0}
          max={99}
          step={1}
          onChange={(ev) =>
            handleItemValueChange(Number(ev.currentTarget.value))
          }
        />
      </div>
      <FontAwesomeIcon
        icon={faTrash}
        className={styles.icon}
        onClick={handleItemDeletion}
      />
    </div>
  );
};

export default MiniProduct;
