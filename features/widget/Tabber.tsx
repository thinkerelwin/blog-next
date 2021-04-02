import React from "react";

import { useAppDispatch } from "@/store/index";
import { setActiveWidget } from "./widgetSlice";

import styles from "./Tabber.module.scss";

export const WIDGETS = [
  {
    name: "recent posts",
    imgPath: "/clock.svg"
  },
  {
    name: "archive",
    imgPath: "/drawer.svg"
  },
  {
    name: "search",
    imgPath: "/search.svg"
  },
  {
    name: "tags",
    imgPath: "/price-tags.svg"
  }
];

export default function Tabber() {
  const dispatch = useAppDispatch();

  return (
    <section className={styles.container}>
      {WIDGETS.map(({ name, imgPath }) => (
        <button key={name} onClick={() => dispatch(setActiveWidget(name))}>
          <img src={imgPath} alt={name} />
        </button>
      ))}
    </section>
  );
}
