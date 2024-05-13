import { Button } from "frames.js/next";
import { frames } from "../frames";

const handleRequest = frames(async (ctx) => {
    return {
        image: "https://remote-image.decentralized-content.com/image?url=https%3A%2F%2Fmagic.decentralized-content.com%2Fipfs%2Fbafybeids4eqjfyigji4wxkjtx43fyr3cmgizhdp3l353u2ajp3vyvwj7ay&w=1920&q=75",
        imageOptions: {
            width: 1080,
            height: 1080,
            aspectRatio: "1:1"
        },
        buttons: [
            <Button action="post" target={`/mint`} >
                Your card
            </Button>,
            <Button action="link" target="https://asiv-web.vercel.app">
                About SURFY
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
