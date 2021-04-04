import React from "react";

import PencilSharpener from "./svg/PencilSharpener";

import styles from "./MainTitle.module.scss";

export default function MainTitle() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Elwin's Blog</h1>
      <p className={`${styles.subtitle} cute-font`}>
        someone who likes to think
      </p>

      <PencilSharpener cn={styles["pencil-sharpener"]} />
    </div>
  );
}
