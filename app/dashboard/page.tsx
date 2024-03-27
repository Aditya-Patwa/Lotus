"use client";
import { useEffect } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const { connected } = useWallet();
    const router = useRouter();

    useEffect(() => {
        if(connected) {
            console.log("Wallet Connected");
        } else {
            console.log("Wallet Not Connected");
            router.push("/");
        }
    }, [connected]);


    return (
        <h1>This is Dashboard!</h1>
    );
}