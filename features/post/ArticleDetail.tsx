import Link from "next/link";

import Article from "./Article";
import Pencil from "@/components/svg/Pencil";
import SidePanel from "./SidePanel";
import Footer from "@/components/Footer";

import { PostType } from "@/features/post/Article";
import { linksForWidgetsType } from "@/features/widget/MobileWidgets";

import styles from "./ArticleDetail.module.scss";

const tags = ["desk", "drafting"];

export default function ArticleDetail({
  post,
  linksForWidgets
}: {
  post: PostType;
  linksForWidgets: linksForWidgetsType;
}) {
  return (
    <>
      <div className={styles["outer-container"]}>
        <main className={styles.container}>
          <Article post={post}>
            <footer className={styles.footer}>
              <h4 className={styles["tag-header"]}>Tagged:</h4>
              {tags.map((tagName) => (
                <Link key={tagName} href={`/tags/${tagName}`}>
                  <a className={styles.tag}>{tagName}</a>
                </Link>
              ))}
            </footer>
          </Article>
          <Pencil cn={styles.pencil} />
        </main>
        <SidePanel linksForWidgets={linksForWidgets} />
      </div>
      <Footer />
    </>
  );
}
