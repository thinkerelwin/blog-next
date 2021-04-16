import React from "react";
import Link from "next/link";

import Line from "./svg/Line";
import IcoMoon from "./svg/IcoMoon";

import styles from "./Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.container}>
      <Line />
      <div className={styles.icons}>
        <Link href="https://www.linkedin.com/in/chi-heng-huang-3071b657/">
          <a target="_blank" rel="noopener" className={styles.link}>
            <IcoMoon cn={styles.icon} iconName="linkedin2" />
          </a>
        </Link>
        <Link href="https://github.com/thinkerelwin">
          <a target="_blank" rel="noopener" className={styles.link}>
            <IcoMoon cn={styles.icon} iconName="github" />
          </a>
        </Link>
        <a
          href="https://www.iubenda.com/privacy-policy/38079897"
          className={`${styles.link} ${styles.privacy}`}
          title="Privacy Policy "
        >
          Privacy Policy
        </a>
      </div>
    </footer>
  );
}
