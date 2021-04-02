import React from "react";

import styles from "./SearchBar.module.scss";

const Header = () => {
  return (
    <section className={styles.container}>
      <form role="search" onSubmit={() => {}}>
        <label>
          <span>search</span>
          <input type="search" placeholder="search ..." />
        </label>
        <button type="submit">
          <img className={styles.search} src="/search.svg" alt="search" />
        </button>
      </form>
    </section>
  );
};

export default Header;
