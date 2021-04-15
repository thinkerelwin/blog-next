import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import dayjs from "dayjs";

import MainTitle from "@/components/MainTitle";
import Posts from "@/features/post/Posts";
import MobileWidgets from "@/features/widget/MobileWidgets";

import {
  getAllPosts,
  getPathsForArchives,
  getLinksForWidgets
} from "@/utils/getLinksForWidgets";

const dateFormat = "YYYY-MM-DDTHH:mm:ss[Z]";

export default function ArticlesSortedByDate({
  posts,
  dateForDisplay,
  linksForWidgets,
  allPosts
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{`Month: ${dateForDisplay}`}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts
        posts={posts}
        linksForWidgets={linksForWidgets}
        sortBy={`Month: ${dateForDisplay}`}
        allPosts={allPosts}
      />
      <MobileWidgets linksForWidgets={linksForWidgets} allPosts={allPosts} />
    </>
  );
}

export async function getStaticProps(context: { params: { date: string } }) {
  const date = context.params.date;
  const startDate = dayjs(new Date(0))
    .set("date", 1)
    .set("month", Number(date.slice(-2)) - 1)
    .set("year", Number(date.slice(0, 4)));
  const endDate = startDate.add(1, "month");

  const res = await (
    await fetch(
      `${process.env.BACKEND_URL}/posts?created_at_gte=${startDate.format(
        dateFormat
      )}&created_at_lte=${endDate.format(dateFormat)}`
    )
  ).json();

  const linksForWidgets = await getLinksForWidgets();
  const allPosts = await getAllPosts();

  return {
    props: {
      posts: res,
      dateForDisplay: startDate.format("MMMM YYYY"),
      linksForWidgets,
      allPosts
    },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths() {
  const res = await (await fetch(`${process.env.BACKEND_URL}/posts`)).json();

  return { paths: getPathsForArchives(res[0].created_at), fallback: false };
}
