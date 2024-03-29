import dayjs from "dayjs";

import { PostType } from "@/features/post/Article";

const NUMBER_OF_RECENT_POSTS = 7;

export function getPathsForArchives(dateOfFirstPost: string) {
  const months = [];
  let date;
  const startDate = dayjs(dateOfFirstPost);

  function getTemplate(date: dayjs.Dayjs) {
    return { params: { date: dayjs(date).format("YYYY-MM") } };
  }

  for (
    date = dayjs(new Date());
    !(date.month() === startDate.month() && date.year() === startDate.year());
    date = date.subtract(1, "month")
  ) {
    months.push(getTemplate(date));
  }

  months.push(getTemplate(date));

  return months;
}

const FETCH_RANGE = 10;

function getTimestamp(dateString: string) {
  const date = new Date(dateString);
  return date.getTime();
}

export async function getLinksForWidgets() {
  const tags = await (await fetch(`${process.env.BACKEND_URL}/tags`)).json();

  const linksForTags = tags.map(({ tag }: { tag: string }) => ({
    linkName: tag,
    path: `/tags/${tag}`
  }));

  const initialPost = await (
    await fetch(`${process.env.BACKEND_URL}/posts?_start=0&_limit=1`)
  ).json();
  const listForArchives = getPathsForArchives(initialPost[0].created_at);
  // example of date format: 2021-12
  const linksForArchives = listForArchives.map(({ params: { date } }) => {
    const month = dayjs()
      .set("month", Number(date.slice(-2)) - 1)
      .format("MMMM");
    return {
      linkName: `${month} ${date.slice(0, 4)}`,
      path: `/archives/${date}`
    };
  });

  const NumberOfPosts = await (
    await fetch(`${process.env.BACKEND_URL}/posts/count`)
  ).json();
  const recentPosts: PostType[] = await (
    await fetch(
      `${process.env.BACKEND_URL}/posts?_start=${Math.max(
        NumberOfPosts - FETCH_RANGE,
        0
      )}`
    )
  ).json();

  recentPosts.sort(
    (a, b) => getTimestamp(b.published_at) - getTimestamp(a.published_at)
  );

  const linksForRecentPosts = recentPosts
    .slice(0, NUMBER_OF_RECENT_POSTS)
    .map(({ title, slug }: { title: string; slug: string }) => {
      return {
        linkName: title,
        path: `/posts/${slug}`
      };
    });

  return {
    linksForArchives,
    linksForTags,
    linksForRecentPosts,
    recentPosts
  };
}

export async function getAllPosts() {
  const posts = await (await fetch(`${process.env.BACKEND_URL}/posts`)).json();

  const allPosts = posts.map((post: PostType) => {
    return {
      postName: post.title.toLowerCase(),
      path: `/posts/${post.slug}`
    };
  });

  return allPosts;
}
