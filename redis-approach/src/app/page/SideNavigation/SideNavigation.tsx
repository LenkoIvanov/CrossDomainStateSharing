import styles from "./SideNavigation.module.scss";

const SideNavigation = () => {
  return (
    <nav className={styles.sideNavigation}>
      <h2 className={styles.navTitle}>Categories</h2>
      <ul className={styles.categoryList}>
        <li>Books</li>
        <li>Laptops</li>
        <li>Appliances</li>
        <li>Video games</li>
        <li>Monitors</li>
        <li>Headsets, headphones</li>
        <li>PC periphery</li>
      </ul>
    </nav>
  );
};

export default SideNavigation;
