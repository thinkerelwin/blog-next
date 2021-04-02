import React from "react";
import Link from "next/link";

import styles from "./TextOnly.module.scss";

export default function TextOnly() {
  return (
    <article className={styles.container}>
      <header className={styles.header}>
        <div className={styles.tags}>
          <Link href="/">
            <a className={styles.tag}>tag</a>
          </Link>
        </div>
        <h2 className={styles.title}>title</h2>
        <p className={`${styles.time} cute-font`}>
          Posted on <time className="t">February 1, 2016</time>
        </p>
      </header>
      <p className={styles.content}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem, officia
        aperiam dicta blanditiis incidunt sint numquam quibusdam soluta
        temporibus laboriosam ad, ratione consectetur est voluptatem commodi
        laudantium, ex non ea? Alias sint accusantium, est reprehenderit,
        officiis fuga quae ullam in facilis earum delectus dignissimos rem quis
        mollitia beatae nisi ea asperiores iusto at perferendis? Architecto
        quisquam dolorum provident nobis magni. Unde delectus pariatur quis
        harum porro mollitia. Neque id dolorem dignissimos eveniet placeat
        voluptatibus corporis, architecto commodi numquam facilis hic unde odio
        fuga, eos beatae earum magnam incidunt libero dolorum. Tempora nulla
        aliquid doloribus libero harum inventore debitis autem ab sequi earum
        reprehenderit pariatur, velit quod odit, praesentium quam adipisci culpa
        amet doloremque iure cumque sunt consequuntur? Laboriosam, dolores ex.
        Deleniti maxime, eaque repudiandae fuga, quam, eum aperiam sint eveniet
        corrupti nesciunt ut unde. Mollitia magni dolorem maxime ullam ipsa
        recusandae numquam a ad quam eligendi, illum beatae consequatur quaerat.
      </p>
      <p className={`${styles.continue} cute-font`}>Continue reading</p>
    </article>
  );
}
