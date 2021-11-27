import React, { useState, useRef, FormEvent } from "react";
import Link from "next/link";

import IconMoon from "@/components/svg/IcoMoon";

import styles from "./SearchBar.module.scss";

export interface allPostTitlesType {
  postName: string;
  path: string;
}

const SearchBar = ({ allPosts }: { allPosts: allPostTitlesType[] }) => {
  const searchString = useRef<HTMLInputElement | null>(null);
  const [allPostTitles] = useState<allPostTitlesType[]>(allPosts);
  const [results, setResults] = useState<allPostTitlesType[]>([]);

  function handleSearch(event: FormEvent) {
    event.preventDefault();
    const inputValue = searchString && searchString.current?.value;
    if (inputValue?.trim()) {
      const LowerCasedInputValue = inputValue.toLocaleLowerCase();
      setResults(
        allPostTitles.filter((post) =>
          post.postName.includes(LowerCasedInputValue)
        )
      );
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.form} role="search" onSubmit={handleSearch}>
        <label className={styles.label}>
          <span className={styles.text}>search</span>
          <input
            ref={searchString}
            className={styles.keyword}
            type="text"
            placeholder="search ..."
            minLength={3}
            required
          />
        </label>
        <button className={styles.submit} type="submit">
          <IconMoon cn={styles.search} iconName={"search"} />
        </button>
        <ul className={styles.results}>
          {results.map((result) => (
            <Link key={result.path} href={result.path}>
              <a className={styles.result}>{result.postName}</a>
            </Link>
          ))}
        </ul>
      </form>
    </section>
  );
};

export default SearchBar;
