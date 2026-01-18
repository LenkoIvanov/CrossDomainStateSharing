import { products } from "@/app/resources/products";
import ProductCard from "./ProductCard/ProductCard";
import styles from "./ProductGrid.module.scss";

const ProductGrid = () => {
  return (
    <section className={styles.productGrid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </section>
  );
};

export default ProductGrid;
