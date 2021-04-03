import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import throttle from "lodash/throttle";

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

  const prevOffsetRef = useRef(0);

  useEffect(() => {
    let isRunning = false;

    function handleMenuVisibility(shouldConceal: boolean) {
      isRunning = false;

      const target = document.querySelector("#tabber");

      if (shouldConceal) {
        target?.classList.add(styles.conceal);
      } else {
        target?.classList.remove(styles.conceal);
      }
    }

    function setMenuVisibility() {
      if (isRunning) return;

      isRunning = true;
      const offset = window.pageYOffset;
      const isScrollUp = offset < prevOffsetRef.current;

      requestAnimationFrame(() => handleMenuVisibility(!isScrollUp));

      prevOffsetRef.current = offset;
    }

    window.addEventListener("scroll", throttle(setMenuVisibility, 250));
  }, []);

  return (
    <section id="tabber" className={classnames(styles.container)}>
      {WIDGETS.map(({ name, imgPath }) => (
        <button key={name} onClick={() => dispatch(setActiveWidget(name))}>
          <img src={imgPath} alt={name} />
        </button>
      ))}
    </section>
  );
}
