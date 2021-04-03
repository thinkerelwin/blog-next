import { useEffect, useMemo } from "react";
import classnames from "classnames";

import SearchBar from "@/features/widget/SearchBar";
import LinksWidget from "@/features/widget/LinksWidget";
import Tabber from "@/features/widget/Tabber";

import { useAppDispatch, useAppSelector } from "@/store/index";
import { setActiveWidget } from "./widgetSlice";

import { WIDGETS } from "@/features/widget/Tabber";

import styles from "./MobileWidgets.module.scss";

enum WidgetThemes {
  Default = "general",
  Alert = "pink"
}

const linksForMonth = [
  {
    name: "April 2021",
    path: "/"
  },
  {
    name: "March 2021",
    path: "/"
  },
  {
    name: "February 2021",
    path: "/"
  },
  {
    name: "January 2021",
    path: "/"
  },
  {
    name: "December 2020",
    path: "/"
  },
  {
    name: "November 2020",
    path: "/"
  },
  {
    name: "October 2020",
    path: "/"
  },
  {
    name: "September 2020",
    path: "/"
  },
  {
    name: "August 2020",
    path: "/"
  },
  {
    name: "July 2020",
    path: "/"
  },
  {
    name: "June 2020",
    path: "/"
  },
  {
    name: "May 2020",
    path: "/"
  }
];

const linksForPosts = [
  {
    name: "exampleA",
    path: "/"
  },
  {
    name: "exampleB",
    path: "/"
  },
  {
    name: "exampleC",
    path: "/"
  },
  {
    name: "exampleD",
    path: "/"
  },
  {
    name: "exampleE",
    path: "/"
  },
  {
    name: "exampleF",
    path: "/"
  },
  {
    name: "exampleG",
    path: "/"
  },
  {
    name: "exampleH",
    path: "/"
  },
  {
    name: "exampleI",
    path: "/"
  },
  {
    name: "exampleJ",
    path: "/"
  },
  {
    name: "exampleK",
    path: "/"
  },
  {
    name: "exampleL",
    path: "/"
  },
  {
    name: "exampleM",
    path: "/"
  },
  {
    name: "exampleN",
    path: "/"
  },
  {
    name: "exampleO",
    path: "/"
  },
  {
    name: "exampleP",
    path: "/"
  },
  {
    name: "exampleO",
    path: "/"
  }
];

const linksForTags = [
  {
    name: "tag1",
    path: "/"
  },
  {
    name: "tag2",
    path: "/"
  },
  {
    name: "tag3",
    path: "/"
  }
];

export default function MobileWidgets() {
  const dispatch = useAppDispatch();
  const nameOfActiveWidget = useAppSelector(
    (state) => state.widget.nameOfActiveWidget
  );

  const hasActiveTab = useMemo(() => nameOfActiveWidget.length > 0, [
    nameOfActiveWidget
  ]);

  function changeTab(name: string) {
    const isSameTab = nameOfActiveWidget === name;
    const targetName = isSameTab ? "" : name;
    dispatch(setActiveWidget(targetName));
  }

  useEffect(() => {
    document.querySelector("body")!.style.overflow = hasActiveTab
      ? "hidden"
      : "initial";
  }, [hasActiveTab]);

  return (
    <div
      className={classnames(styles.container, {
        [styles.active]: hasActiveTab
      })}
    >
      {nameOfActiveWidget === WIDGETS[0].name && (
        <LinksWidget
          title="recent posts"
          links={linksForPosts}
          theme={WidgetThemes.Alert}
        />
      )}
      {nameOfActiveWidget === WIDGETS[1].name && (
        <LinksWidget
          title="archives"
          links={linksForMonth}
          theme={WidgetThemes.Default}
        />
      )}
      {nameOfActiveWidget === WIDGETS[2].name && <SearchBar />}
      {nameOfActiveWidget === WIDGETS[3].name && (
        <LinksWidget
          title="tags"
          links={linksForTags}
          theme={WidgetThemes.Default}
        />
      )}
      <Tabber nameOfActiveWidget={nameOfActiveWidget} changeTab={changeTab} />
    </div>
  );
}
