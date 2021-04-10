import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import Posts from "@/features/post/Posts";
import MainTitle from "@/components/MainTitle";
import MobileWidgets from "@/features/widget/MobileWidgets";

export default function ArticlesSortedByTag({
  posts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <>
      <Head>
        <title>Elwin's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts posts={posts} sortBy={`Tag: ${tag}`} />
      <MobileWidgets />
    </>
  );
}

export async function getStaticProps(context: { params: { tag: string } }) {
  const tags = await (
    await fetch(`http://localhost:1337/tags?tag=${context.params.tag}`)
  ).json();

  return {
    props: { posts: tags[0].posts },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths(context: { params: { tag: string } }) {
  const res = await (await fetch(`http://localhost:1337/tags`)).json();

  const paths = res.map(({ tag }: { tag: string }) => ({
    params: { tag }
  }));

  return { paths, fallback: false };
}
