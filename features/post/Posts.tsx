import Article from "./Article";
import Tag from "./Tag";
import SidePanel from "./SidePanel";
import Footer from "@/components/Footer";

import { PostType } from "@/features/post/Article";
import { linksForWidgetsType } from "@/features/widget/MobileWidgets";
import { allPostTitlesType } from "@/features/widget/SearchBar";

import styles from "./Posts.module.scss";

export default function Posts({
  posts,
  sortBy,
  linksForWidgets,
  allPosts
}: {
  posts: PostType[];
  sortBy?: string;
  linksForWidgets: linksForWidgetsType;
  allPosts: allPostTitlesType[];
}) {
  return (
    <>
      <div className={styles["outer-container"]}>
        <main className={styles.container}>
          {sortBy && <Tag sortBy={sortBy} />}
          {posts.map((post) => (
            <Article key={post.id} post={post} isPreview />
          ))}
        </main>
        <SidePanel linksForWidgets={linksForWidgets} allPosts={allPosts} />
      </div>
      <Footer />
    </>
  );
}
