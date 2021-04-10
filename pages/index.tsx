import Head from "next/head";
import { GetStaticProps } from "next";
import { InferGetStaticPropsType } from "next";

import Posts from "@/features/post/Posts";
import MainTitle from "@/components/MainTitle";
import MobileWidgets from "@/features/widget/MobileWidgets";

export default function Home({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>Elwin's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts posts={posts} />
      <MobileWidgets />
    </>
  );
}

export async function getStaticProps(context: GetStaticProps) {
  const posts = await (await fetch("http://localhost:1337/posts")).json();

  return {
    props: { posts },
    revalidate: 24 * 60 * 60
  };
}
