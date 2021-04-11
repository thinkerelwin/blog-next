import SearchBar from "@/features/widget/SearchBar";
import LinksWidget from "@/features/widget/LinksWidget";
import { WidgetThemes } from "@/features/widget/MobileWidgets";

import { linksForWidgetsType } from "@/features/widget/MobileWidgets";

import styles from "./SidePanel.module.scss";

export default function SidePanel({
  linksForWidgets
}: {
  linksForWidgets: linksForWidgetsType;
}) {
  return (
    <>
      <aside className={styles.widgets}>
        <SearchBar />
        <LinksWidget
          title="archives"
          links={linksForWidgets.linksForArchives}
          theme={WidgetThemes.Default}
        />
        <LinksWidget
          title="recent posts"
          links={linksForWidgets.linksForRecentPosts}
          theme={WidgetThemes.Alert}
        />
        <LinksWidget
          title="tags"
          links={linksForWidgets.linksForTags}
          theme={WidgetThemes.Default}
        />
      </aside>
    </>
  );
}
