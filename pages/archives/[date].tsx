import Head from "next/head";
import { InferGetStaticPropsType } from "next";
import dayjs from "dayjs";

import MainTitle from "@/components/MainTitle";
import Posts from "@/features/post/Posts";
import MobileWidgets from "@/features/widget/MobileWidgets";

import {
  getPathsForArchives,
  getLinksForWidgets
} from "@/utils/getLinksForWidgets";

const dateFormat = "YYYY-MM-DDTHH:mm:ss[Z]";

export default function ArticlesSortedByDate({
  posts,
  dateForDisplay,
  linksForWidgets
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>article title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <Posts
        posts={posts}
        linksForWidgets={linksForWidgets}
        sortBy={`Month: ${dateForDisplay}`}
      />
      <MobileWidgets linksForWidgets={linksForWidgets} />
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
      `http://localhost:1337/posts?createdAt_gte=${startDate.format(
        dateFormat
      )}&createdAt_lte=${endDate.format(dateFormat)}`
    )
  ).json();

  const linksForWidgets = await getLinksForWidgets();

  return {
    props: {
      posts: res,
      dateForDisplay: startDate.format("MMMM YYYY"),
      linksForWidgets
    },
    revalidate: 24 * 60 * 60
  };
}

export async function getStaticPaths() {
  const res = await (await fetch("http://localhost:1337/posts")).json();

  return { paths: getPathsForArchives(res[0].createdAt), fallback: false };
}
