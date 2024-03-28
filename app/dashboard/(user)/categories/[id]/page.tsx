"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function Category({ params }: { params: { id: string } }) {
    const pathname = usePathname();

    return (
        <>
        <h1>
            This is Category <br />
            Id: {params.id}
        </h1>

            <Link href={`${pathname}/new-category`}>
                Add Category
            </Link>

            <Link href={`${pathname}/new-note`}>
                New Note
            </Link>
        </>
    );
}