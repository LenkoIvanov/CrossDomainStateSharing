import styles from "./LinkButton.module.scss";

interface LinkButtonProps {
  textContent: string;
  href: string;
}

const LinkButton = (props: LinkButtonProps) => {
  const { textContent, href } = props;

  return (
    <a href={href} className={styles.link}>
      {textContent}
    </a>
  );
};

export default LinkButton;
