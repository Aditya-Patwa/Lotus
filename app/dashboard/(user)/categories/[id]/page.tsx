"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState, useEffect } from 'react';
import { programID, network, opts } from '@/app/api/web3/web3';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider, Idl } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { idl } from '@/app/idl';
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";
import styles from '../page.module.css';


interface CategoryInterface {
    name: String,
    description: String,
    parent: PublicKey | null,
    creator: PublicKey
}

export default function Category({ params }: { params: { id: string } }) {
    const pathname = usePathname();
    const wallet = useAnchorWallet();
    const { connected, publicKey } = useWallet();
    const [category, setCategory] = useState<CategoryInterface | null>(null);

    
    const [categories, setCategories] = useState<any[]>([]);

    const [notes, setNotes] = useState<any[]>([]);


    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts);
    };



    async function getCategory() {
    
        const provider = getProvider();
        if (!provider) {
            console.log("Provider is not available");
        }
    
        if (!connected) {
            console.log("Wallet Not Connected");
        }
    
        const program = new Program(idl, programID, provider!);



        const fetchedCategory = await program.account.category.fetch(new PublicKey(params.id));

        console.log("On-chain data: ", fetchedCategory);

        setCategory({name: fetchedCategory.name, description: fetchedCategory.description, parent: fetchedCategory.parent, creator: fetchedCategory.creator});


        
        let all_categories = await program.account.category.all();

        let my_category = all_categories.filter((i) => {
            // if (i.account.parent) { 
                if (i.account.parent?.toString() == params.id.toString()) {   
                    return (i.account.creator.toString() === publicKey!.toString());
                }
            // }
        });

        setCategories([...my_category]);


        let all_notes = await program.account.note.all();

        let my_notes = all_notes.filter((i) => {
            // if (i.account.parent) { 
                if (i.account.category?.toString() == params.id.toString()) {   
                    return (i.account.creator.toString() === publicKey!.toString());
                }
            // }
        });

        setNotes([...my_notes]);
    }

    useEffect(() => {
        getCategory();
    }, []);


    return (
        <>
            
            <div className={styles.topDiv}>
                <h1 className={styles.title}>
                    {category && (category.name)}
                </h1>
            </div>

            <p style={{padding: "1rem", color: "grey", fontWeight: "500"}}>
                {category && (category.description)}
            </p>

            <div className={styles.topDiv}>
                <div>
                    <Link href={`${pathname}/new-category`} className={styles.saveBtn} style={{textDecoration: "None"}}>
                        New Sub Category
                    </Link>
                </div>
                <div>
                <Link href={`${pathname}/new-note`} className={styles.saveBtn} style={{textDecoration: "None"}}>
                    New Note
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

            <ul className={styles.list}>
                {notes.map((note, i) => {
                    return (
                        <li key={i}>
                            <Link href={`/dashboard/note/${note.publicKey.toString()}`} className={styles.links}>
                                <div className={styles.noteBox}>
                                    <div className={styles.categoryName}>  
                                        {note.account.name}
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