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

    const [community, setCommunity] = useState<any|null>(null);

    const [ismember, setIsmember] = useState<boolean>(false);

    


    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts);
    };



    async function getCommunity() {
    
        const provider = getProvider();
        if (!provider) {
            console.log("Provider is not available");
        }
    
        if (!connected) {
            console.log("Wallet Not Connected");
        }
    
        const program = new Program(idl, programID, provider!);


        
        let mycommunity = await program.account.community.fetch(new PublicKey(params.id));


        for(let i=0; i<mycommunity.members.length; i++) {
            let member = mycommunity.members[i].toString();

            if (member == wallet?.publicKey.toString()) {
                console.log("Is Member");
                setIsmember(true);
                break;
            }
        }

        setCommunity(mycommunity);

    }

    useEffect(() => {
        getCommunity();
    }, []);


    return (
        <>
            
            <div className={styles.topDiv}>
                <h1 className={styles.title}>
                    {community && (community.name)}
                </h1>
            </div>

            <p style={{padding: "1rem", color: "grey", fontWeight: "500"}}>
                    {community && (community.description)}
            </p>

            <div className={styles.topDiv}>
                <div>
                    <button className={styles.saveBtn} style={{textDecoration: "None"}}>
                        {ismember ? ("Already a Member") : ("Join Community")}
                    </button>
                </div>
            </div>

            
        </>
    );
}