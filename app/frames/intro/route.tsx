import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
    return {
            image: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fmagic.decentralized-content.com%2Fipfs%2Fbafybeids4eqjfyigji4wxkjtx43fyr3cmgizhdp3l353u2ajp3vyvwj7ay&w=1920&q=75",
            buttons: [
                // <Button action="mint" target={`eip155:8453:${ZORA_COLLECTION_ADDRESS}:${ZORA_TOKEN_ID}`}>
                //     Mint
                // </Button>,
                <Button action="post" target={{ pathname: "/mint" }}>
                    Mint
                </Button>,
                <Button action="link" target="https://asiv-web.vercel.app">
                    About SURFY
                </Button>,
            ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
