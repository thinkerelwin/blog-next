import React from "react";

import styles from "./Tag.module.scss";

export default function Tag({ name = "Home" }) {
  return (
    <div className={styles.container}>
      <h1 className={`${styles.title} cute-font`}>Category: {name}</h1>
    </div>
  );
}
