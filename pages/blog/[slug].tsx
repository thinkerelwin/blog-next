import React from "react";

import Head from "next/head";

import MainTitle from "@/components/MainTitle";
import ArticleDetail from "@/features/post/ArticleDetail";
import MobileWidgets from "@/features/widget/MobileWidgets";

export default function ArticleDetailContainer() {
  return (
    <>
      <Head>
        <title>article title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MainTitle />
      <ArticleDetail />
      <MobileWidgets />
    </>
  );
}
