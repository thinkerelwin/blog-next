import React from "react";

import PencilSharpener from "./svg/PencilSharpener";
import Pencil from "@/components/svg/Pencil";
import styles from "./MainTitle.module.scss";

export default function MainTitle({ hasPencil }: { hasPencil?: boolean }) {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Elwin's Blog</h1>
      <p className={`${styles.subtitle} cute-font`}>
        someone who likes to think
      </p>

      <PencilSharpener />
      {hasPencil && <Pencil />}
    </div>
  );
}
