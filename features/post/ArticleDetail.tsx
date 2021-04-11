import Link from "next/link";

import Article from "./Article";
import Pencil from "@/components/svg/Pencil";
import SidePanel from "./SidePanel";
import Footer from "@/components/Footer";

import { PostType } from "@/features/post/Article";
import { linksForWidgetsType } from "@/features/widget/MobileWidgets";
import { allPostTitlesType } from "@/features/widget/SearchBar";

import styles from "./ArticleDetail.module.scss";

export default function ArticleDetail({
  post,
  linksForWidgets,
  allPosts
}: {
  post: PostType;
  linksForWidgets: linksForWidgetsType;
  allPosts: allPostTitlesType[];
}) {
  return (
    <>
      <div className={styles["outer-container"]}>
        <main className={styles.container}>
          <Article post={post}>
            <footer className={styles.footer}>
              <h4 className={styles["tag-header"]}>Tagged:</h4>
              {post.tags.map(({ tag }) => (
                <Link key={tag} href={`/tags/${tag}`}>
                  <a className={styles.tag}>{tag}</a>
                </Link>
              ))}
            </footer>
          </Article>
          <Pencil cn={styles.pencil} />
        </main>
        <SidePanel linksForWidgets={linksForWidgets} allPosts={allPosts} />
      </div>
      <Footer />
    </>
  );
}
