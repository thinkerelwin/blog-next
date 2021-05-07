import Head from "next/head";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

import Posts from "@/features/post/Posts";
import MainTitle from "@/components/MainTitle";
import MobileWidgets from "@/features/widget/MobileWidgets";

import { getAllPosts, getLinksForWidgets } from "@/utils/getLinksForWidgets";
import md from "@/utils/sanitizer";

export default function Home({
  posts,
  linksForWidgets,
  allPosts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Elwin's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts
        posts={posts}
        linksForWidgets={linksForWidgets}
        allPosts={allPosts}
      />
      <MobileWidgets linksForWidgets={linksForWidgets} allPosts={allPosts} />
    </>
  );
}

export async function getStaticProps(context: GetStaticProps) {
  const linksForWidgets = await getLinksForWidgets();
  const allPosts = await getAllPosts();

  linksForWidgets.recentPosts.forEach((post) => {
    post.content = md.render(post.content);
  });

  return {
    props: {
      posts: linksForWidgets.recentPosts,
      linksForWidgets,
      allPosts
    },
    revalidate: 24 * 60 * 60
  };
}

// TODO add functionality to load image when it's close to the viewport
// TODO add facebook Comments Plugin
