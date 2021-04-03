import React from "react";

import styles from "./SearchBar.module.scss";

const Header = () => {
  return (
    <section className={styles.container}>
      <form className={styles.form} role="search" onSubmit={() => {}}>
        <label className={styles.label}>
          <span className={styles.text}>search</span>
          <input
            className={styles.keyword}
            type="search"
            placeholder="search ..."
          />
        </label>
        <button className={styles.submit} type="submit">
          <img className={styles.search} src="/search.svg" alt="search" />
        </button>
      </form>
    </section>
  );
};

export default Header;
