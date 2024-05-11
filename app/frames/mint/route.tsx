import { Button } from "frames.js/next";
import { frames } from "../frames";
import {ZORA_COLLECTION_ADDRESS, ZORA_TOKEN_ID} from "../../config";

const handleRequest = frames(async (ctx) => {
    const address = ctx.message?.connectedAddress
    return {
            image: (
                <span>{ctx.message?.connectedAddress}</span>
            ),
            buttons: [
                <Button action="mint" target={`eip155:8453:${ZORA_COLLECTION_ADDRESS}:${ZORA_TOKEN_ID}`}>
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
