import { useEffect, useMemo } from "react";
import classnames from "classnames";

import SearchBar from "@/features/widget/SearchBar";
import LinksWidget from "@/features/widget/LinksWidget";
import Tabber from "@/features/widget/Tabber";

import { useAppDispatch, useAppSelector } from "@/store/index";
import { setActiveWidget } from "./widgetSlice";

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
    <>
      <div
        className={classnames(styles.container, {
          [styles.active]: hasActiveTab
        })}
      >
        {/* TODO can be grouped with a switch or */}
        {nameOfActiveWidget === WIDGETS[0].name && (
          <LinksWidget
            title="recent posts"
            links={linksForWidgets.linksForRecentPosts}
            theme={WidgetThemes.Alert}
          />
        )}
        {nameOfActiveWidget === WIDGETS[1].name && (
          <LinksWidget
            title="archives"
            links={linksForWidgets.linksForArchives}
            theme={WidgetThemes.Default}
          />
        )}
        {nameOfActiveWidget === WIDGETS[2].name && (
          <SearchBar allPosts={allPosts} />
        )}
        {nameOfActiveWidget === WIDGETS[3].name && (
          <LinksWidget
            title="tags"
            links={linksForWidgets.linksForTags}
            theme={WidgetThemes.Default}
          />
        )}
      </div>
      <Tabber nameOfActiveWidget={nameOfActiveWidget} changeTab={changeTab} />
    </>
  );
}
