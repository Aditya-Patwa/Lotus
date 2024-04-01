"use client";
import { roboto_slab } from "@/app/ui/fonts";

import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";


import "@solana/wallet-adapter-react-ui/styles.css";

// import Wallet from "@/app/components/Wallet";


import styles from "./page.module.css";
import style from "./dashboard/layout.module.css";
import dynamic from 'next/dynamic';
import { usePathname } from "next/navigation";

const WallentBtns = dynamic(() => import('@/app/components/mywal').then((mod) => mod.Mywal), { ssr: false });

import { useRouter } from "next/navigation";

import Link from "next/link";



export default function Home() {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname();
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const router = useRouter();

  function handleToggle() {
    setToggle(!toggle);
  }

  useEffect(() => {
    if (window.innerWidth <= 468) {
      setToggle(false);
    }
  }, [pathname]);


  useEffect(() => {
    if (connected) {
      console.log("Wallet Connected");
      router.push("/dashboard");
    } else {
      console.log("Wallet Not Connected");
    }
  }, [connected]);


  return (
    <>
      <main className={styles.main}>
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
                <Link href="/" className={styles.navLink}>Home</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Products</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Resources</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Pricing</Link>
              </li>
              <li className={styles.navItem}>
                <Link href="/" className={styles.navLink}>Blogs</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.walletDiv}>
            <WallentBtns />
            {/* <WalletDisconnectButton className={styles.walletBtn} style={{background: "transparent"}} /> */}
          </div>

          <div className={styles.toggleDiv}>
            <WallentBtns />
            <button className={styles.toggleBtn} onClick={handleToggle}>
              <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" fill="white" className="bi bi-list" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
          </div>
        </header>


        {toggle && (
        <section className={style.sideBar}>
          <div className={style.topBar}>
            <div className={style.titleDiv}>
              <h2>
                <Link href="/" className={`${roboto_slab.className} antialiased`}>Lotus</Link>
              </h2>
              <div className={style.ballDiv}></div>
            </div>
            <div className={style.closeSideBarDiv}>
              <button className={style.toggleBtn} onClick={handleToggle}>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.75rem" height="1.75rem" fill="white" className="bi bi-x" viewBox="0 0 16 16">
                  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
              </button>
            </div>
          </div>

          <div className={style.navDiv}>
            <ul className={style.navList}>
              <li className={`${style.listItem} ${pathname === '/' ? style.active : ''}`}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-house" viewBox="0 0 16 16">
                  <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
                </svg>
                </div>
                <Link href="/" className={style.listLink}>Home</Link>
              </li>
              <li className={`${style.listItem} ${pathname === '/dashboard/categories' ? style.active : ''}`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-boxes" viewBox="0 0 16 16">
                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                  </svg>
                </div>
                <Link href="/" className={style.listLink}>Products</Link>
              </li>
              <li className={`${style.listItem} ${pathname === '/dashboard/categories' ? style.active : ''}`}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-body-text" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M0 .5A.5.5 0 0 1 .5 0h4a.5.5 0 0 1 0 1h-4A.5.5 0 0 1 0 .5m0 2A.5.5 0 0 1 .5 2h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m9 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-9 2A.5.5 0 0 1 .5 4h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m5 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-12 2A.5.5 0 0 1 .5 6h6a.5.5 0 0 1 0 1h-6a.5.5 0 0 1-.5-.5m8 0a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m-8 2A.5.5 0 0 1 .5 8h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5m7 0a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-7 2a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 0 1h-8a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m0 2a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
                </svg>
                </div>
                <Link href="/" className={style.listLink}>Resources</Link>
              </li>
              <li className={`${style.listItem} ${pathname === '/dashboard/categories' ? style.active : ''}`}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-credit-card" viewBox="0 0 16 16">
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1z"/>
                  <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                </svg>
                </div>
                <Link href="/" className={style.listLink}>Pricing</Link>
              </li>
              <li className={`${style.listItem} ${pathname === '/dashboard/categories' ? style.active : ''}`}>
                <div>
                <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-substack" viewBox="0 0 16 16">
                  <path d="M15 3.604H1v1.891h14v-1.89ZM1 7.208V16l7-3.926L15 16V7.208zM15 0H1v1.89h14z"/>
                </svg>
                </div>
                <Link href="/" className={style.listLink}>Blogs</Link>
              </li>
            </ul>
          </div>
        </section>
      )}



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
