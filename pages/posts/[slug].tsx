import Head from "next/head";

import MainTitle from "@/components/MainTitle";
import ArticleDetail from "@/features/post/ArticleDetail";
import MobileWidgets, {
  linksForWidgetsType
} from "@/features/widget/MobileWidgets";

import { OriginalPostType } from "@/features/post/Article";
import { getAllPosts, getLinksForWidgets } from "@/utils/getLinksForWidgets";
import { PostType } from "@/features/post/Article";
import { allPostTitlesType } from "@/features/widget/SearchBar";

export default function ArticleDetailContainer({
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
      <Head>
        <title>{post.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <ArticleDetail
        post={post}
        linksForWidgets={linksForWidgets}
        allPosts={allPosts}
      />
      <MobileWidgets linksForWidgets={linksForWidgets} allPosts={allPosts} />
    </>
  );
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const res = await (
    await fetch(`${process.env.BACKEND_URL}/posts?slug=${context.params.slug}`)
  ).json();

  const linksForWidgets = await getLinksForWidgets();
  const allPosts = await getAllPosts();

  return {
    props: { post: res[0], linksForWidgets, allPosts },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths() {
  const res = await (await fetch(`${process.env.BACKEND_URL}/posts`)).json();

  const paths = res.map((post: OriginalPostType) => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: false };
}
