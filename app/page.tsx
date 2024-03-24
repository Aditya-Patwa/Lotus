import Image from "next/image";
import styles from "./page.module.css";
import { roboto_slab } from "@/app/ui/fonts";

export default function Home() {
  return (
    <>
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.titleDiv}>
            <h2>
              <a href="/" className={`${roboto_slab.className} antialiased`}>Lotus Notebook</a>
            </h2>
          </div>
          <nav className={styles.navBar}>
            <ul className={`${roboto_slab.className} ${styles.navList} antialiased`}>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>Home</a>
              </li>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>Products</a>
              </li>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>Resources</a>
              </li>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>Pricing</a>
              </li>
              <li className={styles.navItem}>
                <a href="/" className={styles.navLink}>Blogs</a>
              </li>
            </ul>
          </nav>
          <div className={styles.walletDiv}>
            <button className={`${roboto_slab.className} ${styles.walletBtn} antialiased`}>
              Connect Wallet
            </button>
          </div>
        </header>

        <section className={styles.mainSection}>
          <div>
            <h1 className={`${roboto_slab.className} ${styles.tagline} antialiased`}>
              Explore new possibilities with <br />
              <span>Lotus Notebooks</span>
            </h1>
          </div>
        </section>
      </main>
    </>
  );
}
