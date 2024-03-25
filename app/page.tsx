"use client";
import Image from "next/image";
import { roboto_slab } from "@/app/ui/fonts";

import { useState } from "react";
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import {
  WalletMultiButton,
  WalletDisconnectButton,
} from "@solana/wallet-adapter-react-ui";


import { idl } from "@/app/idl"; // The path to your JSON IDL file



const programID = new PublicKey("2T8nS5g6szDurxKHS2RGwr1ve9MBhxyX73t7HsLFFBAs");
const network = "http://127.0.0.1:8899"; // Adjust for your environment: local, devnet, or mainnet-beta
const opts = { preflightCommitment: "processed" };


import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { clusterApiUrl } from "@solana/web3.js";
import "@solana/wallet-adapter-react-ui/styles.css";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

const wallets = [new PhantomWalletAdapter()];


import styles from "./page.module.css";

import "@solana/wallet-adapter-react-ui/styles.css";


export default function Home() {
  return (
    <ConnectionProvider endpoint="http://127.0.0.1:8899">
      {" "}
      {/* Use your desired network */}
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>
          <MainPage />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}



function MainPage() {
  const wallet = useAnchorWallet();
  const { connected } = useWallet();
  const [greetingAccountPublicKey, setGreetingAccountPublicKey] =
    useState<String | null>(null);
  const [error, setError] = useState("");

  const getProvider = () => {
    if (!wallet) return null;
    const connection = new Connection(network, "processed");
    return new AnchorProvider(connection, wallet, { preflightCommitment: "processed" });
  };

  const createGreeting = async () => {
    setError("");
    if (!connected) {
      setError("Wallet is not connected.");
      return;
    }
    const provider = getProvider();
    if (!provider) {
      setError("Provider is not available.");
      return;
    }
    const program = new Program(idl, programID, provider);
  };


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
            <WalletMultiButton className={styles.walletBtn} style={{border: "0px", padding: ".5rem 1rem .5rem 1rem", borderRadius: "100px", color: "black", cursor: "pointer", background: "white", fontWeight: "700"}} />
            {/* <WalletDisconnectButton className={styles.walletBtn} style={{background: "transparent"}} /> */}
          </div>

          <div className={styles.toggleDiv}>
            <WalletMultiButton className={styles.walletBtn} style={{border: "0px", padding: ".5rem 1rem .5rem 1rem", borderRadius: "100px", color: "black", cursor: "pointer", background: "white", fontWeight: "700"}} />
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
