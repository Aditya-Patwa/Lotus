"use client";
import { roboto_slab } from "@/app/ui/fonts";

import { useState, useEffect } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { useWallet } from "@solana/wallet-adapter-react";


import "@solana/wallet-adapter-react-ui/styles.css";

// import Wallet from "@/app/components/Wallet";


import styles from "./page.module.css";
import dynamic from 'next/dynamic';

const WallentBtns = dynamic(() => import('@/app/components/mywal').then((mod) => mod.Mywal), { ssr: false });

import { useRouter } from "next/navigation";

import Link from "next/link";



export default function Home() {
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const router = useRouter();


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
                <Link href="/" className={styles.navLink}>Dashboard</Link>
              </li>
            </ul>
          </nav>
          <div className={styles.walletDiv}>
            <WallentBtns />
            {/* <WalletDisconnectButton className={styles.walletBtn} style={{background: "transparent"}} /> */}
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
