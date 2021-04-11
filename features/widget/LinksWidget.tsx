import React from "react";
import Link from "next/link";
import classnames from "classnames";

import styles from "./LinksWidget.module.scss";

export interface LinkType {
  name: string;
  path: string;
}

export interface LinksWidgetType {
  title: string;
  links: LinkType[];
  theme: string;
}

export default function LinksWidget({ title, links, theme }: LinksWidgetType) {
  return (
    <section
      className={classnames(styles.container, [styles[theme]], "fade-in")}
    >
      <h2 className={`${styles.title} cute-font`}>{title}</h2>
      <ul className={styles.list}>
        {links.map(({ name, path }) => (
          <li key={name} className={styles["list-item"]}>
            <Link href={path}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
