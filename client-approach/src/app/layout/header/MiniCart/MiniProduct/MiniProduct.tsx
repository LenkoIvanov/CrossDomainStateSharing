import { Product } from "@/app/types/Product";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./MiniProduct.module.scss";

interface MiniProductProps {
  product: Product;
}

const MiniProduct = (props: MiniProductProps) => {
  const { name, imageUrl, price, altText } = props.product;

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
          defaultValue={1}
          min={0}
          max={99}
          step={1}
        />
      </div>
      <FontAwesomeIcon icon={faTrash} className={styles.icon} />
    </div>
  );
};

export default MiniProduct;
