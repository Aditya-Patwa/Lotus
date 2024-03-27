import type { Idl } from "@project-serum/anchor"

export const idl: Idl = {"version":"0.1.0","name":"quote_app","instructions":[{"name":"initialize","accounts":[{"name":"baseAccount","isMut":true,"isSigner":true},{"name":"signer","isMut":true,"isSigner":true},{"name":"systemProgram","isMut":false,"isSigner":false}],"args":[{"name":"quote","type":"string"}]},{"name":"updateQuote","accounts":[{"name":"baseAccount","isMut":true,"isSigner":false}],"args":[{"name":"newQuote","type":"string"}]}],"accounts":[{"name":"BaseAccount","type":{"kind":"struct","fields":[{"name":"quote","type":"string"}]}}]};