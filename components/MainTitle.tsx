import React from "react";

import Clip from "./svg/Clip";
import PencilSharpener from "./svg/PencilSharpener";
import Pencil from "./svg/Pencil";
import styles from "./MainTitle.module.scss";

export default function MainTitle() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Elwin's Blog</h1>
      <p className={`${styles.subtitle} cute-font`}>
        someone who likes to think
      </p>
      <Clip />
      <PencilSharpener />
      <Pencil />
    </div>
  );
}
