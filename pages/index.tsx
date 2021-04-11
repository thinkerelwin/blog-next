import Head from "next/head";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

import Posts from "@/features/post/Posts";
import MainTitle from "@/components/MainTitle";
import MobileWidgets from "@/features/widget/MobileWidgets";

import { getLinksForWidgets } from "@/utils/getLinksForWidgets";

export default function Home({
  posts,
  linksForWidgets
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Elwin's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts posts={posts} linksForWidgets={linksForWidgets} />
      <MobileWidgets linksForWidgets={linksForWidgets} />
    </>
  );
}

export async function getStaticProps(context: GetStaticProps) {
  const linksForWidgets = await getLinksForWidgets();

  return {
    props: {
      posts: linksForWidgets.recentPosts,
      linksForWidgets
    },
    revalidate: 24 * 60 * 60
  };
}

// TODO SEO
// TODO GA
