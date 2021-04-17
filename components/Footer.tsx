import React from "react";

import Line from "./svg/Line";
import IcoMoon from "./svg/IcoMoon";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Line />
      <div className={styles.icons}>
        <a
          href="https://www.linkedin.com/in/chi-heng-huang-3071b657/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="linkedin"
          className={styles.link}
        >
          <IcoMoon cn={styles.icon} iconName="linkedin2" />
        </a>

        <a
          href="https://github.com/thinkerelwin"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="github"
          className={styles.link}
        >
          <IcoMoon cn={styles.icon} iconName="github" />
        </a>
      </div>
      <a
        href="https://www.iubenda.com/privacy-policy/38079897"
        className={styles.privacy}
        title="Privacy Policy "
      >
        Privacy Policy
      </a>
    </footer>
  );
}
