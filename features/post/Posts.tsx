import React from "react";

import TextOnly from "./TextOnly";

import styles from "./Posts.module.scss";

export default function Posts() {
  return (
    <div className={styles.container}>
      <TextOnly />
    </div>
  );
}
