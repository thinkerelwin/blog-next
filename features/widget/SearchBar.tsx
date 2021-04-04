import React from "react";

import IconMoon from "@/components/svg/IcoMoon";

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
          <IconMoon cn={styles.search} iconName={"search"} />
        </button>
      </form>
    </section>
  );
};

export default Header;
