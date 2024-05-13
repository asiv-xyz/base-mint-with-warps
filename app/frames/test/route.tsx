import { Button } from "frames.js/next";
import { frames } from "../frames";
import {NEXT_PUBLIC_URL} from "../../config";
import {base} from "viem/chains";
import React from "react";
import {createImagesWorker} from "frames.js/middleware/images-worker/next";
import {getTokenUrl} from "frames.js";
import {isUserHasNft} from "../utils/nft";

const handleRequest = frames(async (ctx) => {
    return {
        image: (
            <div style={{ display: "flex", flexDirection: "column", width: '1080px', height: '1080px' }}>
                test test
                { ctx.message?.requesterUserData?.username }
                { ctx.message?.requesterUserData?.profileImage }
                { ctx.message?.requesterVerifiedAddresses }
            </div>
        ),
        imageOptions: {
            width: 1080,
            height: 1080,
            aspectRatio: "1:1"
        },
        buttons: [
            <Button action="link" target={`https://warpcast.com/~/compose?embeds[]=${NEXT_PUBLIC_URL}/frames/mint&text=Minted my /surfy`} >
                Share
            </Button>,
            <Button action="link" target="https://asiv-web.vercel.app">
                About SURFY
            </Button>,
        ],
    };
});

const imagesRoute = createImagesWorker({
    secret: "SOME_SECRET_VALUE",
});

export const GET = handleRequest;
export const POST = handleRequest;
