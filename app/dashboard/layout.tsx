"use client";
import styles from "@/app/dashboard/page.module.css";
import { roboto_slab } from "@/app/ui/fonts";
import Link from "next/link";


import dynamic from 'next/dynamic';

const WallentBtns = dynamic(() => import('@/app/components/mywal').then((mod) => mod.Mywal), { ssr: false });


export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
        <header className={styles.header}>
          <div className={styles.titleDiv}>
            <h2>
              <Link href="/" className={`${roboto_slab.className} antialiased`}>Lotus</Link>
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
            <WallentBtns />
          </div>

          <div className={styles.toggleDiv}>
            <WallentBtns />
            <button className={styles.toggleBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
          </div>
        </header>

      <section>
        {children}
      </section>
    </>
  );
}