"use client";
import EditorJS from '@editorjs/editorjs';
import { useRef, useEffect } from 'react';
import "./page.module.css";

export default function NewNote({ params }: { params: { id: string } }) {
    const editorRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const editor = new EditorJS({
            /**
             * Id of Element that should contain Editor instance
             */
            holder: editorRef.current!,
            
        });
    });
    

      

    return (
        <>
        <h1>
            Creating New Note <br />
            Under category of Id: {params.id}
        </h1>


            <section ref={editorRef}>

            </section>
        </>
    );
}