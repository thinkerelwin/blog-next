import React from "react";
import Link from "next/link";

import PencilSharpener from "./svg/PencilSharpener";

import styles from "./MainTitle.module.scss";

export default function MainTitle() {
  return (
    <div className={styles.container}>
      <Link href="/">
        <a className={styles.title}>Elwin's Blog</a>
      </Link>
      <p className={`${styles.subtitle} cute-font`}>
        an activist who likes to think
      </p>

      <PencilSharpener cn={styles["pencil-sharpener"]} />
    </div>
  );
}
