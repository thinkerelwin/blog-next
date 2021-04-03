import React from "react";
import Link from "next/link";

import Article from "./Article";
import Pencil from "@/components/svg/Pencil";
import styles from "./ArticleDetail.module.scss";

const tags = ["desk", "drafting"];

export default function ArticleDetail() {
  return (
    <div className={styles.container}>
      <Article image={"1"}>
        <footer className={styles.footer}>
          <h4 className={styles["tag-header"]}>Tagged:</h4>
          {tags.map((tag) => (
            <Link key={tag} href="/">
              <a className={styles.tag}>{tag}</a>
            </Link>
          ))}
        </footer>
      </Article>
      <div className={styles.related}>
        <Link href="/">
          <a>
            <h5 className={`${styles["related-header"]} cute-font`}>
              previous post
            </h5>
            <p className={styles["related-title"]}>My favorite song</p>
          </a>
        </Link>
      </div>
      <div className={styles.related}>
        <Link href="/">
          <a>
            <h5 className={`${styles["related-header"]} cute-font`}>
              previous post
            </h5>
            <p className={styles["related-title"]}>My favorite song</p>
          </a>
        </Link>
      </div>
      <Pencil cn={styles.pencil} />
    </div>
  );
}
