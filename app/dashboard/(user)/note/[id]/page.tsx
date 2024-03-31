// @ts-nocheck
"use client";
import EditorJS from '@editorjs/editorjs';
import { useRef, useEffect, useState } from 'react';
import styles from '@/app/dashboard/(user)/categories/[id]/(new)/new-note/page.module.css';
// import styles from '..//page.module.css';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Embed from '@editorjs/embed';
import AttachesTool from '@editorjs/attaches';
import SimpleImage from "@editorjs/simple-image";
import ImageTool from '@editorjs/image';
import LinkTool from '@editorjs/link';
import RawTool from '@editorjs/raw';
import Checklist from '@editorjs/checklist';
import Quote from '@editorjs/quote';
import Warning from '@editorjs/warning';
import Delimiter from '@editorjs/delimiter';
import Table from '@editorjs/table';
import TextVariantTune from '@editorjs/text-variant-tune';
import CodeTool from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import Marker from '@editorjs/marker';
import Underline from '@editorjs/underline';

import { programID, network, opts } from '@/app/api/web3/web3';
import { useAnchorWallet } from "@solana/wallet-adapter-react";
import { Program, AnchorProvider } from "@project-serum/anchor";
import { useWallet } from "@solana/wallet-adapter-react";
import { idl } from '@/app/idl';
import { Connection, PublicKey, SystemProgram, Keypair } from "@solana/web3.js";

import { useRouter } from 'next/navigation';


interface NoteInterface {
    name: String,
    data: String,
    url: String,
    category: PublicKey | null,
    creator: PublicKey
}

export default function NewNote({ params }: { params: { id: string } }) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const isReady = useRef(false);
    const editorJsRef = useRef<EditorJS | null>(null);
    const [error, setError] = useState<String | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [note, setNote] = useState<NoteInterface | null>(null);

    const [notedata, setNotedata] = useState({});

    const router = useRouter();

    const wallet = useAnchorWallet();
    const { connected, publicKey } = useWallet();


    const getProvider = () => {
        if (!wallet) return null;
        const connection = new Connection(network, opts.preflightCommitment);
        return new AnchorProvider(connection, wallet, opts);
    };

    async function fetchNote() {
        const provider = getProvider();
        if (!provider) {
            console.log("Provider is not available");
        }
    
        if (!connected) {
            console.log("Wallet Not Connected");
        }
    
        const program = new Program(idl, programID, provider!);

        const fetchedNote = await program.account.note.fetch(new PublicKey(params.id));

        console.log(fetchedNote);
        setNote({name: fetchedNote.name, data: fetchedNote.data, url: fetchedNote.url, category: fetchedNote.category.toString(), creator: fetchedNote.creator.toString()});

    }

    async function fetchNoteUrl() {
        if(note?.url) {
            let res = await fetch(note.url);
            let data = await res.json();

            console.log(data);
            setNotedata(data.data);
            editorJsRef.current = new EditorJS({
                /**
                 * Id of Element that should contain Editor instance
                 */
                holder: editorRef.current!,
                placeholder: "Let's Start😇....",

                readOnly: true,

                /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */
                tools: {
                    header: Header,
                    list: List,
                    embed: Embed,
                    attaches: {
                        class: AttachesTool,
                        config: {
                            endpoint: '/api/uploadfile'
                        }
                    },
                    image: SimpleImage,
                    upload_image: {
                        class: ImageTool,
                        config: {
                            endpoints: {
                                byFile: '/api/uploadimg', // Your backend file uploader endpoint
                                // byUrl: '/api/uploadfile', // Your endpoint that provides uploading by Url
                            }
                        }
                    },
                    linkTool: {
                        class: LinkTool,
                        config: {
                            endpoint: '/api/fetchurl', // Your backend endpoint for url data fetching,
                        }
                    },
                    raw: RawTool,
                    code: CodeTool,
                    checklist: {
                        class: Checklist,
                        inlineToolbar: true,
                    },
                    quote: Quote,
                    table: Table,
                    warning: Warning,
                    delimiter: Delimiter,
                    textVariant: TextVariantTune,
                    inlineCode: {
                        class: InlineCode,
                        shortcut: 'CMD+SHIFT+M',
                    },
                    Marker: {
                        class: Marker,
                        shortcut: 'CMD+SHIFT+M',
                    },
                    underline: Underline,
                },

                tunes: ['textVariant'],


                data: data.data
            });
        }
    }

    useEffect(() => {
        fetchNote();
    }, []);

    useEffect(() => {
        fetchNoteUrl();
    }, [note]);





    return (
        <>
            <div className={styles.topDiv}>
                <h1 className={styles.title}>
                    {note && (note.name)}
                </h1>
            </div>

            <p style={{padding: "1rem", color: "grey", fontWeight: "500"}}>
                {note && (note.data)}
            </p>

            <section className={styles.editor} ref={editorRef}>

            </section>
        </>
    );
}
