import md from "@/utils/sanitizer";

import { PostType } from "@/features/post/Article";

export function markdownToHtml(posts: PostType[]) {
  return posts.map((post) => ({
    ...post,
    content: md.render(post.content),
    abstract: md.render(post.abstract)
  }));
}
