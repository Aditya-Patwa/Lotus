"use client";
import { useState, useEffect } from "react";
import styles from '../new-note/page.module.css';
import sty from "../../../new/page.module.css";

import { programID, network, opts } from '@/app/api/web3/web3';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { idl } from '@/app/idl';
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";

import { useRouter } from "next/navigation";



export default function NewCategory({ params }: { params: { id: string } }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState<String | null>(null);

    const router = useRouter();

    const wallet = useAnchorWallet();
    const { connected, publicKey } = useWallet();


    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts);
    };





    async function createCategory() {
        if (title.trim().length === 0) {
            console.log("Title is Empty");
            setError("Title cannot be empty ❌");
            return;
        }

        if (description.trim().length === 0) {
            console.log("Description is Empty");
            setError("Description cannot be empty ❌");
            return;
        } else {
            setError(null);
        }


        const provider = getProvider();
        if (!provider) {
            setError("Provider is not available.");
            return "Provider is not available";
        }

        if(!connected) {
            setError("Wallet Not Connected.");
            return "Wallet Not Connected";
        }
    
        const program = new Program(idl, programID, provider);
        
        try {
            const newAccountKp = Keypair.generate();
    
            console.log(newAccountKp.publicKey.toString());
    
            const txHash = await program.methods
                .createCategory(title, description, new PublicKey(params.id), publicKey)
                .accounts({
                    categoryAccount: newAccountKp.publicKey,
                    signer: publicKey!,
                    systemProgram: SystemProgram.programId,
                })
                .signers([newAccountKp])
                .rpc();
    
            router.push(`/dashboard/categories/${params.id}`);
            return "Success";
        } catch (err) {
            console.error("Error creating greeting account:", err);
            setError("Failed to create greeting account. Please try again.");
        }
    }
    
    return (
        <>
            <div className={styles.topDiv}>
                <h1 className={sty.title}>
                    New Sub Category 🪷
                </h1>
            </div>

            {error && (
                <div className={styles.errorBlock}>
                    <div>
                        {error}
                    </div>
                </div>
            )}

            <div className={styles.noteConfig}>
                <div>
                    <input type="text" value={title} onChange={e => setTitle(e.target.value)} className={styles.titleInput} placeholder="Title" name="title" id="" />
                </div>
                <div>
                    <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} className={styles.descriptionInput} placeholder="Description" id="" cols={10} rows={5}></textarea>
                </div>
            </div>

            <div style={{display: "grid", placeContent: "center"}}>
                <div className={sty.saveDiv}>
                    <button className={sty.saveBtn} onClick={createCategory}>
                        Save
                    </button>
                </div>
            </div>
        </>
    );
}