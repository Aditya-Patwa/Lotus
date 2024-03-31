import { Connection, PublicKey, SystemProgram, Keypair, ConfirmOptions } from "@solana/web3.js";


export const programID = new PublicKey("2T8nS5g6szDurxKHS2RGwr1ve9MBhxyX73t7HsLFFBAs");
export const network = "http://127.0.0.1:8899"; // Adjust for your environment: local, devnet, or mainnet-beta
export const opts: ConfirmOptions = { preflightCommitment: "processed" };