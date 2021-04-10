import Head from "next/head";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

import MainTitle from "@/components/MainTitle";
import ArticleDetail from "@/features/post/ArticleDetail";
import MobileWidgets from "@/features/widget/MobileWidgets";

import { OriginalPostType } from "@/features/post/Article";

export default function ArticleDetailContainer({
  post
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>article title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <ArticleDetail post={post} />
      <MobileWidgets />
    </>
  );
}

export async function getStaticProps(context: { params: { slug: string } }) {
  const res = await (
    await fetch(`http://localhost:1337/posts?slug=${context.params.slug}`)
  ).json();

  return {
    props: { post: res[0] },
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
