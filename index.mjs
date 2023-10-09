//@ts-check
import * as bs58 from "bs58";
import { Connection, LAMPORTS_PER_SOL, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const connection = new Connection(clusterApiUrl("devnet"));

const account = new PublicKey("EK8htQwXQ2yphgWsjB9YExKsmx4QLvxYCYAXdHDUxv1o");

async function getBalance(account) {
    const balance = await connection.getBalance(account);
    console.log("Devnent Balance: ", balance);
    console.log("Formatted Balance: ", balance / LAMPORTS_PER_SOL);
}

getBalance(account);

(async () => {
    // connection
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");

    const owner = new PublicKey("EK8htQwXQ2yphgWsjB9YExKsmx4QLvxYCYAXdHDUxv1o");
    let response = await connection.getParsedTokenAccountsByOwner(owner, {
        programId: TOKEN_PROGRAM_ID,
    });

    response.value.forEach((accountInfo) => {
        console.log(`pubkey: ${accountInfo.pubkey.toBase58()}`);
        console.log(`mint: ${accountInfo.account.data["parsed"]["info"]["mint"]}`);
        console.log(
            `owner: ${accountInfo.account.data["parsed"]["info"]["owner"]}`
        );
        console.log(
            `decimals: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["decimals"]}`
        );
        console.log(
            `amount: ${accountInfo.account.data["parsed"]["info"]["tokenAmount"]["amount"]}`
        );
        console.log("====================");
    });
})();



