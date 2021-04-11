import Head from "next/head";
import { InferGetStaticPropsType } from "next";

import MainTitle from "@/components/MainTitle";
import ArticleDetail from "@/features/post/ArticleDetail";
import MobileWidgets from "@/features/widget/MobileWidgets";

import { OriginalPostType } from "@/features/post/Article";
import { getAllPosts, getLinksForWidgets } from "@/utils/getLinksForWidgets";

export default function ArticleDetailContainer({
  post,
  linksForWidgets,
  allPosts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>article title</title>
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
    await fetch(`http://localhost:1337/posts?slug=${context.params.slug}`)
  ).json();

  const linksForWidgets = await getLinksForWidgets();
  const allPosts = await getAllPosts();

  return {
    props: { post: res[0], linksForWidgets, allPosts },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths() {
  const res = await (await fetch("http://localhost:1337/posts")).json();

  const paths = res.map((post: OriginalPostType) => ({
    params: { slug: post.slug }
  }));

  return { paths, fallback: false };
}
