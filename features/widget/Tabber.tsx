import React, { useEffect, useRef } from "react";
import classnames from "classnames";
import throttle from "lodash/throttle";

import IcoMoon from "@/components/svg/IcoMoon";

import styles from "./Tabber.module.scss";

export const WIDGETS = [
  {
    name: "recent posts",
    imgName: "clock"
  },
  {
    name: "archive",
    imgName: "drawer"
  },
  {
    name: "search",
    imgName: "search"
  },
  {
    name: "tags",
    imgName: "price-tags"
  }
];

export default function Tabber({
  nameOfActiveWidget,
  changeTab
}: {
  nameOfActiveWidget: string;
  changeTab: Function;
}) {
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
      {WIDGETS.map(({ name, imgName }) => (
        <button key={name} onClick={() => changeTab(name)}>
          <IcoMoon
            cn={classnames(styles.image, {
              [styles.active]: nameOfActiveWidget === name
            })}
            iconName={imgName}
          />
        </button>
      ))}
    </section>
  );
}
