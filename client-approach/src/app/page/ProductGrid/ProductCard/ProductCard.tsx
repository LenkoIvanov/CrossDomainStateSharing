import { Product } from "@/types/Product";
import styles from "./ProductCard.module.scss";
import Button from "@/app/common/Button/Button";

interface ProductCardProps {
  product: Product;
}

const ProductCard = (props: ProductCardProps) => {
  const { product } = props;
  const { name, price, imageUrl, altText } = product;

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
        <Button type="primary">Add to cart</Button>
      </div>
    </div>
  );
};

export default ProductCard;
