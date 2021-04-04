import React from "react";

import SearchBar from "@/features/widget/SearchBar";
import LinksWidget from "@/features/widget/LinksWidget";
import {
  linksForPosts,
  WidgetThemes,
  linksForMonth,
  linksForTags
} from "@/features/widget/MobileWidgets";

import styles from "./SidePanel.module.scss";

export default function SidePanel() {
  return (
    <>
      <aside className={styles.widgets}>
        <SearchBar />
        <LinksWidget
          title="archives"
          links={linksForMonth}
          theme={WidgetThemes.Default}
        />
        <LinksWidget
          title="recent posts"
          links={linksForPosts}
          theme={WidgetThemes.Alert}
        />
        <LinksWidget
          title="tags"
          links={linksForTags}
          theme={WidgetThemes.Default}
        />
      </aside>
    </>
  );
}
