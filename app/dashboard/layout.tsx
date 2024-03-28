"use client";
import styles from "@/app/dashboard/layout.module.css";
import { roboto_slab } from "@/app/ui/fonts";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from 'next/navigation';
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

import dynamic from 'next/dynamic';

const WallentBtns = dynamic(() => import('@/app/components/mywal').then((mod) => mod.Mywal), { ssr: false });


export default function Layout({ children }: { children: React.ReactNode }) {
  const [toggle, setToggle] = useState(false);
  const pathname = usePathname()

  const { connected } = useWallet();
  const router = useRouter();

  function handleToggle() {
    setToggle(!toggle);
  }


  useEffect(() => {
    if (connected) {
      console.log("Wallet Connected");
    } else {
      console.log("Wallet Not Connected");
      router.push("/");
    }
  }, [connected]);


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

          <div className={styles.navDiv}>
            <ul className={styles.navList}>
              <li className={`${styles.listItem} ${pathname === '/dashboard' ? styles.active : ''}`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-briefcase" viewBox="0 0 16 16">
                    <path d="M6.5 1A1.5 1.5 0 0 0 5 2.5V3H1.5A1.5 1.5 0 0 0 0 4.5v8A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-8A1.5 1.5 0 0 0 14.5 3H11v-.5A1.5 1.5 0 0 0 9.5 1zm0 1h3a.5.5 0 0 1 .5.5V3H6v-.5a.5.5 0 0 1 .5-.5m1.886 6.914L15 7.151V12.5a.5.5 0 0 1-.5.5h-13a.5.5 0 0 1-.5-.5V7.15l6.614 1.764a1.5 1.5 0 0 0 .772 0M1.5 4h13a.5.5 0 0 1 .5.5v1.616L8.129 7.948a.5.5 0 0 1-.258 0L1 6.116V4.5a.5.5 0 0 1 .5-.5" />
                  </svg>
                </div>
                <Link href="/dashboard" className={styles.listLink}>Dashboard</Link>
              </li>
              <li className={`${styles.listItem} ${pathname === '/dashboard/categories' ? styles.active : ''}`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-boxes" viewBox="0 0 16 16">
                    <path d="M7.752.066a.5.5 0 0 1 .496 0l3.75 2.143a.5.5 0 0 1 .252.434v3.995l3.498 2A.5.5 0 0 1 16 9.07v4.286a.5.5 0 0 1-.252.434l-3.75 2.143a.5.5 0 0 1-.496 0l-3.502-2-3.502 2.001a.5.5 0 0 1-.496 0l-3.75-2.143A.5.5 0 0 1 0 13.357V9.071a.5.5 0 0 1 .252-.434L3.75 6.638V2.643a.5.5 0 0 1 .252-.434zM4.25 7.504 1.508 9.071l2.742 1.567 2.742-1.567zM7.5 9.933l-2.75 1.571v3.134l2.75-1.571zm1 3.134 2.75 1.571v-3.134L8.5 9.933zm.508-3.996 2.742 1.567 2.742-1.567-2.742-1.567zm2.242-2.433V3.504L8.5 5.076V8.21zM7.5 8.21V5.076L4.75 3.504v3.134zM5.258 2.643 8 4.21l2.742-1.567L8 1.076zM15 9.933l-2.75 1.571v3.134L15 13.067zM3.75 14.638v-3.134L1 9.933v3.134z" />
                  </svg>
                </div>
                <Link href="/dashboard/categories" className={styles.listLink}>Categories</Link>
              </li>
              <li className={`${styles.listItem} ${pathname === '/dashboard/meetings' ? styles.active : ''}`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-telephone-fill" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z" />
                  </svg>
                </div>
                <Link href="/dashboard/meetings" className={styles.listLink}>Meetings</Link>
              </li>
              <li className={`${styles.listItem} ${pathname === '/dashboard/chats' ? styles.active : ''}`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-chat-left-dots-fill" viewBox="0 0 16 16">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4.414a1 1 0 0 0-.707.293L.854 15.146A.5.5 0 0 1 0 14.793zm5 4a1 1 0 1 0-2 0 1 1 0 0 0 2 0m4 0a1 1 0 1 0-2 0 1 1 0 0 0 2 0m3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2" />
                  </svg>
                </div>
                <Link href="/dashboard/chats" className={styles.listLink}>Chats</Link>
              </li>
              <li className={`${styles.listItem} ${pathname === '/dashboard/plugins' ? styles.active : ''}`}>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="1.25rem" height="1.25rem" fill="rgb(135, 135, 135)" className="bi bi-plugin" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1 8a7 7 0 1 1 2.898 5.673c-.167-.121-.216-.406-.002-.62l1.8-1.8a3.5 3.5 0 0 0 4.572-.328l1.414-1.415a.5.5 0 0 0 0-.707l-.707-.707 1.559-1.563a.5.5 0 1 0-.708-.706l-1.559 1.562-1.414-1.414 1.56-1.562a.5.5 0 1 0-.707-.706l-1.56 1.56-.707-.706a.5.5 0 0 0-.707 0L5.318 5.975a3.5 3.5 0 0 0-.328 4.571l-1.8 1.8c-.58.58-.62 1.6.121 2.137A8 8 0 1 0 0 8a.5.5 0 0 0 1 0" />
                  </svg>
                </div>
                <Link href="/dashboard/plugins" className={styles.listLink}>Plugins</Link>
              </li>
            </ul>
          </div>
        </section>
      )}

      <section className={`${styles.mainView} ${toggle && styles.halfView}`}>
        <div className={styles.childView}>
          {children}
        </div>
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