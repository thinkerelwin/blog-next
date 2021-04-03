import React from "react";

import Article from "./Article";
import Tag from "./Tag";

import styles from "./Posts.module.scss";

export default function Posts() {
  return (
    <main className={styles.container}>
      <Tag />
      <Article image={"1"} isPreview />
    </main>
  );
}
