import Article from "./Article";
import Tag from "./Tag";
import SidePanel from "./SidePanel";
import Footer from "@/components/Footer";

import { PostType } from "@/features/post/Article";

import styles from "./Posts.module.scss";

export default function Posts({
  posts,
  sortBy
}: {
  posts: PostType[];
  sortBy?: string;
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
        <SidePanel />
      </div>
      <Footer />
    </>
  );
}
