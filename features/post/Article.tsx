import React, { ReactNode } from "react";
import Link from "next/link";
import dayjs from "dayjs";
import classnames from "classnames";

import { useSanitizer } from "@/utils/customHooks";
import Clip from "@/components/svg/Clip";
import styles from "./Article.module.scss";
// import DOMPurify from "dompurify";

interface CoverImageType {
  alternativeText: string;
  caption: string;
  created_at: string;
  ext: string;
  formats: {
    [size: string]: {
      ext: string;
      hash: string;
      height: number;
      mime: string;
      name: string;
      path: null;
      size: number;
      url: string;
      width: number;
    };
  }; // helpful it if using srcset attribute
  hash: string;
  height: number;
  id: string;
  mime: string;
  name: string;
  provider: string;
  related: string[];
  size: number;
  updatedAt: string;
  url: string;
  width: number;
}

export interface PostType {
  content: string;
  cover_image: CoverImageType;
  created_at: string;
  id: string;
  published_at: string;
  slug: string;
  tags: { tag: string }[];
  title: string;
  updatedAt: string;
}

export interface OriginalPostType extends PostType {
  user: Object;
}

export default function Article({
  post,
  children,
  isPreview
}: {
  post: PostType;
  children?: ReactNode;
  isPreview?: boolean;
}) {
  const hasImage = post.cover_image?.url.length > 0;
  const snitizedContent = useSanitizer(post.content);

  if (!snitizedContent) return null;

  return (
    <article
      className={classnames(styles.container, {
        [styles["with-image"]]: hasImage
      })}
    >
      {hasImage && (
        <Link href={`/posts/${post.slug}`}>
          <a className={styles["image-link"]}>
            <img
              className={styles.image}
              srcSet={`${post.cover_image.formats.small.url} ${post.cover_image.formats.small.width}w, ${post.cover_image.formats.medium.url} ${post.cover_image.formats.medium.width}w, ${post.cover_image.formats.large.url} ${post.cover_image.formats.large.width}w`}
              sizes={`{max-width: 37.5em} ${post.cover_image.formats.small.width}px, {max-width: 56.25em} ${post.cover_image.formats.medium.width}px, {max-width: 112.5em} ${post.cover_image.formats.large.width}px`}
              alt="front cover"
            />
            <Clip />
          </a>
        </Link>
      )}
      <header className={styles.header}>
        <div className={styles.tags}>
          {post.tags.map(({ tag }) => (
            <Link key={tag} href={`/tags/${tag}`}>
              <a className={styles.tag}>{tag}</a>
            </Link>
          ))}
        </div>
        <h2 className={styles.title}>{post.title}</h2>
        <p className={`${styles.time} cute-font`}>
          Posted on{" "}
          <time className="t">
            {dayjs(post.updatedAt).format("MMMM D, YYYY")}
          </time>
        </p>
      </header>
      {
        <div
          className={classnames(styles.content, {
            [styles.preview]: isPreview
          })}
          dangerouslySetInnerHTML={{ __html: snitizedContent }}
        ></div>
      }
      {isPreview && (
        <Link href={`/posts/${post.slug}`}>
          <a className={`${styles.continue} cute-font`}>Continue reading</a>
        </Link>
      )}
      {children}
    </article>
  );
}
