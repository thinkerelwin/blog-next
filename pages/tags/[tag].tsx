import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import Posts from "@/features/post/Posts";
import MainTitle from "@/components/MainTitle";
import MobileWidgets from "@/features/widget/MobileWidgets";

import { PostType } from "@/features/post/Article";
import { getLinksForWidgets } from "@/utils/getLinksForWidgets";

export default function ArticlesSortedByTag({
  posts,
  linksForWidgets
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
      <Posts
        posts={posts}
        linksForWidgets={linksForWidgets}
        sortBy={`Tag: ${tag}`}
      />
      <MobileWidgets linksForWidgets={linksForWidgets} />
    </>
  );
}

export async function getStaticProps(context: { params: { tag: string } }) {
  const tags = await (
    await fetch(`http://localhost:1337/tags?tag=${context.params.tag}`)
  ).json();

  const postWithTags = tags[0].posts.map((post: PostType) => {
    return {
      ...post,
      tags: [{ tag: tags[0].tag }]
    };
  });

  const linksForWidgets = await getLinksForWidgets();

  return {
    props: { posts: postWithTags, linksForWidgets },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths() {
  const res = await (await fetch(`http://localhost:1337/tags`)).json();

  const paths = res.map(({ tag }: { tag: string }) => ({
    params: { tag }
  }));

  return { paths, fallback: false };
}
