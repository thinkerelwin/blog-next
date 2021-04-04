import React from "react";

import Article from "./Article";
import Tag from "./Tag";
import SidePanel from "./SidePanel";
import Footer from "@/components/Footer";

import styles from "./Posts.module.scss";

export default function Posts() {
  return (
    <>
      <div className={styles["outer-container"]}>
        <main className={styles.container}>
          <Tag />
          <Article image={"1"} isPreview />
        </main>
        <SidePanel />
      </div>
      <Footer />
    </>
  );
}
