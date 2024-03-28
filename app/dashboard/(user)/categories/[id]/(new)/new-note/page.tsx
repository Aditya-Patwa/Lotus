"use client";
import EditorJS from '@editorjs/editorjs';
import { useRef, useEffect } from 'react';
import styles from '@/app/dashboard/(user)/categories/[id]/(new)/new-note/page.module.css';
import Header from '@editorjs/header';
// @ts-ignore
import List from '@editorjs/list';


export default function NewNote({ params }: { params: { id: string } }) {
    const editorRef = useRef<HTMLDivElement | null>(null);

    const isReady = useRef(false);

    useEffect(() => {
        if (!isReady.current) {
            const editor = new EditorJS({
                /**
                 * Id of Element that should contain Editor instance
                 */
                holder: editorRef.current!,
                placeholder: "Let's Start😇....",



                /** 
   * Available Tools list. 
   * Pass Tool's class or Settings object for each Tool you want to use 
   */
                tools: {
                    header: Header,
                    list: List
                },
            });
            isReady.current = true;
        }
    }, []);




    return (
        <>
            <h1 className={styles.title}>
                New Note ✒️
            </h1>


            <section className={styles.editor} ref={editorRef}>

            </section>
        </>
    );
}