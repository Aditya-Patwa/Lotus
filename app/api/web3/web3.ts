import { Connection, PublicKey, SystemProgram, Keypair, ConfirmOptions } from "@solana/web3.js";


export const programID = new PublicKey(process.env.PROGRAM_ID!);
export const network = "https://api.devnet.solana.com"; // Adjust for your environment: local, devnet, or mainnet-beta
export const opts: ConfirmOptions = { preflightCommitment: "processed" };