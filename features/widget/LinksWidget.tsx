import React from "react";
import Link from "next/link";
import classnames from "classnames";

import styles from "./LinksWidget.module.scss";

interface LinksWidgetType {
  title: string;
  links: {
    name: string;
    path: string;
  }[];
  theme: string;
}

export default function LinksWidget({ title, links, theme }: LinksWidgetType) {
  return (
    <section className={classnames(styles.container, [styles[theme]])}>
      <h2 className="cute-font">{title}</h2>
      <ul>
        {links.map(({ name, path }) => (
          <li key={name}>
            <Link href={path}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
