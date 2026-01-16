import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styles from "./MiniCart.module.scss";
import { products } from "@/app/resources/products";
import MiniProduct from "./MiniProduct/MiniProduct";
import { useSelector } from "react-redux";
import { selectCartItems } from "@/store/cart/selectors";

interface MiniCartProps {
  onClose: () => void;
}

const MiniCart = (props: MiniCartProps) => {
  const { onClose } = props;

  const cartItems = useSelector(selectCartItems);

  return (
    <section className={styles.miniCartContainer}>
      <div className={styles.titleSection}>
        <h4>Your products in cart</h4>
        <FontAwesomeIcon
          className={styles.icon}
          icon={faXmark}
          onClick={onClose}
        />
      </div>
      <div className={styles.productsContainer}>
        {products.map((product) => (
          <MiniProduct key={`mini-${product.id}`} product={cartItems[0]} />
        ))}
      </div>
    </section>
  );
};

export default MiniCart;
