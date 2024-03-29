// @ts-nocheck
"use client";
import EditorJS from '@editorjs/editorjs';
import { useRef, useEffect, useState } from 'react';
// import styles from '@/app/dashboard/(user)/categories/[id]/(new)/new-note/page.module.css';
import styles from './page.module.css';
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


export default function NewNote({ params }: { params: { id: string } }) {
    const editorRef = useRef<HTMLDivElement | null>(null);
    const isReady = useRef(false);
    const editorJsRef = useRef<EditorJS | null>(null);
    const [error, setError] = useState<String | null>(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");



    function saveNote() {
        console.log(title, description);
        if(title.trim().length === 0) {
            console.log("Title is Empty");
            setError("Title cannot be empty ❌");
            return;
        }

        if (description.trim().length === 0) {
            console.log("Description is Empty");
            setError("Description cannot be empty ❌");
            return;
        }

        editorJsRef.current.save().then((outputData) => {
            console.log('Article data: ', outputData);
            if(outputData.blocks.length === 0) {
                console.log("No Data feeded");
                setError("Blog Post cannot be empty ❌");
                return;
            } else {
                setError(null);
            }
        }).catch((error) => {
            console.log('Saving failed: ', error)
        });
    }



    useEffect(() => {
        if (!isReady.current) {
            editorJsRef.current = new EditorJS({
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
            });
            isReady.current = true;
        };
    }, []);




    return (
        <>
            <div className={styles.topDiv}>
                <h1 className={styles.title}>
                    New Note 🖊️
                </h1>
                <div>
                    <button className={styles.saveBtn} onClick={saveNote}>
                        Save
                    </button>
                </div>
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
                    <textarea name="description" value={description} onChange={e => setDescription(e.target.value)} className={styles.descriptionInput} placeholder="Description" id="" cols="10" rows="5"></textarea>
                </div>
            </div>

            <section className={styles.editor} ref={editorRef}>

            </section>
        </>
    );
}