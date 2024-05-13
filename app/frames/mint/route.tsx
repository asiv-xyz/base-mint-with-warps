import { Button } from "frames.js/next";
import { frames } from "../frames";
import {NEXT_PUBLIC_URL, TOKEN_IMAGE, ZORA_COLLECTION_ADDRESS, ZORA_TOKEN_ID} from "../../config";
import {createPublicClient, http} from "viem";
import {base} from "viem/chains";
import {abi} from "../../abi/surfyCard";
import React from "react";
import Image from "next/image";
import {createImagesWorker} from "frames.js/middleware/images-worker/next";

const isUserHasNft = async (addresses: string[] | undefined) => {
    if (addresses == null) {
        return null
    }

    const publicClient = createPublicClient({
        chain: base,
        transport: http(),
    })

    for (const index in addresses) {
        console.log(addresses[index])
        const readResult = await publicClient.readContract({
            abi,
            functionName: 'balanceOf',
            // @ts-ignore
            address: process.env.NEXT_PUBLIC_SURFY_NFT_ADDRESS ?? '0x313714Fc7BfFFcBc5d1F60a6D7E3A3cCBEf5cc36',
            args: [addresses[index], 1],
        })

        if (readResult !== '0x0000000000000000000000000000000000000001') {
            return addresses[index]
        }
    }

    return null
}

const handleRequest = frames(async (ctx) => {
    const hasNft = await isUserHasNft(ctx.message?.requesterVerifiedAddresses)
    if (hasNft) {
        const last = parseInt(hasNft.at(5) || '0') % 5
        let cardAsset
        switch (last) {
            case 0:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_1.png`
                break
            case 1:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_2.png`
                break
            case 2:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_3.png`
                break
            case 3:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_4.png`
                break
            default:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_1.png`
        }
        console.log('cardAsset', cardAsset)
        console.log('image', ctx.message?.requesterUserData?.profileImage)
        return {
            image: (
                <div style={{ display: "flex" }}>
                    <div style={{ display: "flex" }}>
                        <img style={{ width: '1050px', height: '740px', zIndex: 30 }} src={cardAsset} alt={cardAsset} />
                        <img style={{ display: "flex",  position: "absolute", top: '382', left: '160', width: '102px', height: '102px', zIndex: 50, borderRadius: "10px" }} src={ctx.message?.requesterUserData?.profileImage} />
                    </div>
                </div>
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
    }

        return {
            image: (
                <div style={{ display: "flex", flexDirection: "column"}}>
                    <span>username: {ctx.message?.requesterUserData?.username}</span>
                    <span>You can mint SURFY NFT!</span>
                </div>
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

const imagesRoute = createImagesWorker({
    secret: "SOME_SECRET_VALUE",
});

export const GET = imagesRoute();
export const POST = handleRequest;
