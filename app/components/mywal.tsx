"use client";
import {
    WalletMultiButton,
    WalletDisconnectButton,
  } from "@solana/wallet-adapter-react-ui";

export function Mywal() {
    return (
        <WalletMultiButton style={{border: "0px", padding: ".5rem 1rem .5rem 1rem", borderRadius: "100px", color: "black", cursor: "pointer", background: "white", fontWeight: "700"}} />
    );
}