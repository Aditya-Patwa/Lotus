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
              <a href="/" className={`${roboto_slab.className} antialiased`}>Lotus</a>
            </h2>
            <div className={styles.ballDiv}></div>
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

          <div className={styles.toggleDiv}>
            <button className={styles.toggleBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
              </svg>
            </button>
          </div>
        </header>

        <section className={styles.mainSection}>
          <div>
            <h1 className={`${roboto_slab.className} ${styles.tagline} antialiased`}>
              Explore new possibilities with <br />
              <span>Lotus Notebooks</span>
            </h1>
            <p className={`${roboto_slab.className} antialiased`}>
              Manage your task, simplify your workflow. <br />
              Focus on Quality.
            </p>
          </div>

          <div className={styles.getStartedDiv}>
            <button className={`${roboto_slab.className} ${styles.getStartedBtn} antialiased`}>Get Started</button>
          </div>
        </section>
      </main>

    </>
  );
}
