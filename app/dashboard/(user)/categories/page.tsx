"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { programID, network, opts } from '@/app/api/web3/web3';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { idl } from '@/app/idl';
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import styles from './page.module.css';


export default function Categories() {
    const wallet = useAnchorWallet();
    const { connected, publicKey } = useWallet();

    const [categories, setCategories] = useState<any[]>([]);


    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts);
    };


    async function fetchCategories() {


        const provider = getProvider();
        if (!provider) {
            console.log("Provider is not available");
        }

        if (!connected) {
            console.log("Wallet Not Connected");
        }

        const program = new Program(idl, programID, provider!);

        let all_categories = await program.account.category.all();

        let my_category = all_categories.filter((i) => {
            return (i.account.creator.toString() === publicKey!.toString() && i.account.parent === null);
        });

        setCategories([...my_category]);
    }

    useEffect(() => {
        fetchCategories();
    }, []);



    return (
        <>
            <div className={styles.topDiv}>
                <h1 className={styles.title}>
                    Categories
                </h1>
                <div>
                    <Link href="/dashboard/categories/new" className={styles.saveBtn} style={{textDecoration: "None"}}>
                        New Category
                    </Link>
                </div>
            </div>


            <ul className={styles.list}>
                {categories.map((category, i) => {
                    return (
                        <li key={i}>
                            <Link href={`/dashboard/categories/${category.publicKey.toString()}`} className={styles.links}>
                                <div className={styles.linkBox}>
                                    <div className={styles.categoryName}>  
                                        {category.account.name}
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