"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { programID, network, opts } from '@/app/api/web3/web3';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { idl } from '@/app/idl';
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import styles from "./page.module.css";

export default function Community() {
    const wallet = useAnchorWallet();
    const { connected, publicKey } = useWallet();
    let [communities, setCommunities] = useState<any[]>([]);

    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts);
    };


    async function fetchCommunities() {


        const provider = getProvider();
        if (!provider) {
            console.log("Provider is not available");
        }

        if (!connected) {
            console.log("Wallet Not Connected");
        }

        const program = new Program(idl, programID, provider!);

        let all_communities = await program.account.community.all();

        console.log(all_communities);

        setCommunities([...all_communities]);
    }

    useEffect(() => {
        fetchCommunities();
    }, []);



    return (
        <>
            <div className={styles.topDiv}>
                <h1 className={styles.title}>
                    Communities
                </h1>
                <div>
                    <Link href="/dashboard/community/new" className={styles.saveBtn} style={{textDecoration: "None"}}>
                        Create Community
                    </Link>
                </div>
            </div>


            <ul className={styles.list}>
                {communities.map((community, i) => {
                    return (
                        <li key={i}>
                            <Link href={`/dashboard/community/${community.publicKey.toString()}`} className={styles.links}>
                                <div className={styles.linkBox}>
                                    <div className={styles.categoryName}>  
                                        {community.account.name}
                                    </div>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </>

    );
}