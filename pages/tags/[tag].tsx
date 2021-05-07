import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import { useRouter } from "next/router";

import Posts from "@/features/post/Posts";
import MainTitle from "@/components/MainTitle";
import MobileWidgets from "@/features/widget/MobileWidgets";

import { PostType } from "@/features/post/Article";
import { getAllPosts, getLinksForWidgets } from "@/utils/getLinksForWidgets";
import { markdownToHtml } from "@/utils/markdownToHtml";

export default function ArticlesSortedByTag({
  posts,
  linksForWidgets,
  allPosts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  const { tag } = router.query;

  return (
    <>
      <Head>
        <title>{`Tag: ${tag}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts
        posts={posts}
        linksForWidgets={linksForWidgets}
        sortBy={`Tag: ${tag}`}
        allPosts={allPosts}
      />
      <MobileWidgets linksForWidgets={linksForWidgets} allPosts={allPosts} />
    </>
  );
}

export async function getStaticProps(context: { params: { tag: string } }) {
  const tags = await (
    await fetch(`${process.env.BACKEND_URL}/tags?tag=${context.params.tag}`)
  ).json();

  const postWithTags = tags[0].posts.map((post: PostType) => {
    return {
      ...post,
      tags: [{ tag: tags[0].tag }]
    };
  });

  const transformedPosts = markdownToHtml(postWithTags);

  const linksForWidgets = await getLinksForWidgets();
  const allPosts = await getAllPosts();

  return {
    props: { posts: transformedPosts, linksForWidgets, allPosts },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths() {
  const res = await (await fetch(`${process.env.BACKEND_URL}/tags`)).json();

  const paths = res.map(({ tag }: { tag: string }) => ({
    params: { tag }
  }));

  return { paths, fallback: false };
}
