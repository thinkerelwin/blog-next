import { useState, useEffect, useMemo } from "react";
import classnames from "classnames";

import SearchBar from "@/features/widget/SearchBar";
import LinksWidget from "@/features/widget/LinksWidget";
import Tabber from "@/features/widget/Tabber";

import { WIDGETS } from "@/features/widget/Tabber";
import { LinkType } from "@/features/widget/LinksWidget";
import { PostType } from "@/features/post/Article";

import { allPostTitlesType } from "@/features/widget/SearchBar";

import styles from "./MobileWidgets.module.scss";

export enum WidgetThemes {
  Default = "general",
  Alert = "pink"
}

export interface linksForWidgetsType {
  linksForArchives: LinkType[];
  linksForTags: LinkType[];
  linksForRecentPosts: LinkType[];
  recentPosts: PostType[];
}

export default function MobileWidgets({
  linksForWidgets,
  allPosts
}: {
  linksForWidgets: linksForWidgetsType;
  allPosts: allPostTitlesType[];
}) {
  const [nameOfActiveWidget, setNameOfActiveWidget] = useState("");

  const hasActiveTab = useMemo(() => nameOfActiveWidget.length > 0, [
    nameOfActiveWidget
  ]);

  function changeTab(name: string) {
    const isSameTab = nameOfActiveWidget === name;
    const targetName = isSameTab ? "" : name;
    setNameOfActiveWidget(targetName);
  }

  function TabFactory({
    nameOfActiveWidget,
    WIDGETS
  }: {
    nameOfActiveWidget: string;
    WIDGETS: {
      name: string;
      imgName: string;
    }[];
  }) {
    switch (nameOfActiveWidget) {
      case WIDGETS[0].name:
        return (
          <LinksWidget
            title="recent posts"
            links={linksForWidgets.linksForRecentPosts}
            theme={WidgetThemes.Alert}
          />
        );
      case WIDGETS[1].name:
        return (
          <LinksWidget
            title="archives"
            links={linksForWidgets.linksForArchives}
            theme={WidgetThemes.Default}
          />
        );
      case WIDGETS[2].name:
        return <SearchBar allPosts={allPosts} />;
      case WIDGETS[3].name:
        return (
          <LinksWidget
            title="tags"
            links={linksForWidgets.linksForTags}
            theme={WidgetThemes.Default}
          />
        );
      default:
        return null;
    }
  }

  useEffect(() => {
    document.querySelector("body")!.style.overflow = hasActiveTab
      ? "hidden"
      : "initial";
  }, [hasActiveTab]);

  return (
    <>
      <div
        className={classnames(styles.container, {
          [styles.active]: hasActiveTab
        })}
      >
        {TabFactory({ nameOfActiveWidget, WIDGETS })}
      </div>
      <Tabber nameOfActiveWidget={nameOfActiveWidget} changeTab={changeTab} />
    </>
  );
}
