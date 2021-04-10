import styles from "./Tag.module.scss";

export default function Tag({ sortBy }: { sortBy: string }) {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} cute-font`}>{sortBy}</h1>
    </div>
  );
}
