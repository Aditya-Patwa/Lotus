"use client";
import styles from "@/app/dashboard/layout.module.css";
import { roboto_slab } from "@/app/ui/fonts";
import Link from "next/link";
import { useState } from "react";

import dynamic from 'next/dynamic';

const WallentBtns = dynamic(() => import('@/app/components/mywal').then((mod) => mod.Mywal), { ssr: false });


export default function Layout({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState(false);

  function handleToggle() {
    setToggle(!toggle);
  }

  return (
    <>
      <header className={styles.header}>
        <div className={styles.titleDiv}>
          <button className={styles.toggleBtn} onClick={handleToggle}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" fill="white" className="bi bi-list" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
            </svg>
          </button>
          <div className={styles.subTitleDiv}>
            <h2>
              <Link href="/" className={`${roboto_slab.className} antialiased`}>Lotus</Link>
            </h2>
            <div className={styles.ballDiv}></div>
          </div>
        </div>
        <div className={styles.toggleDiv}>
          <WallentBtns />
        </div>
      </header>

      {toggle && (
        <section className={styles.sideBar}>
          <div className={styles.topBar}>
            <div className={styles.titleDiv}>
              <h2>
                <Link href="/" className={`${roboto_slab.className} antialiased`}>Lotus</Link>
              </h2>
              <div className={styles.ballDiv}></div>
            </div>
            <div className={styles.closeSideBarDiv}>
              <button className={styles.toggleBtn} onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>
        </section>
      )}

      <section className={`${styles.mainView} ${toggle && styles.halfView}`}>
        <h1>This is Hello, World!</h1>
        {children}
      </section>





      {/* 
      <section className={styles.mainSection}>
        <section className={styles.mainView}>
          <div className={styles.openSidebarDiv}>
            <button onClick={handleToggle}>
              {toggle ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="white" className="bi bi-arrow-bar-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M12.5 15a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5M10 8a.5.5 0 0 1-.5.5H3.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L3.707 7.5H9.5a.5.5 0 0 1 .5.5"/>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="white" className="bi bi-arrow-bar-right" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8m-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5"/>
                </svg>
              )}
            </button>
          </div>
          <div className={styles.childBox}>
            {children}
          </div>
        </section>

        {toggle ? (
          <section className={styles.sideBar}>
          <div className={styles.topbar}>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.5rem" height="1.5rem" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
              </svg>
            </button>
          </div>
        </section>
        ) : (
          <h1>Juju world!</h1>
        )}
      </section>


      <footer className="footer">

      </footer> */}
    </>
  );
}