import { Button } from "frames.js/next";
import { frames } from "../frames";
import {NEXT_PUBLIC_URL, TOKEN_IMAGE, ZORA_COLLECTION_ADDRESS, ZORA_TOKEN_ID} from "../../config";
import {createPublicClient, http} from "viem";
import {base} from "viem/chains";
import {abi} from "../../abi/surfyCard";
import React from "react";
import {createImagesWorker} from "frames.js/middleware/images-worker/next";
import {getTokenUrl} from "frames.js";

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
        let textColor
        switch (last) {
            case 0:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_1.png`
                textColor = 'white'
                break
            case 1:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_2.png`
                textColor = 'white'
                break
            case 2:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_3.png`
                textColor = 'white'
                break
            case 3:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_4.png`
                textColor = 'black'
                break
            default:
                cardAsset = `${NEXT_PUBLIC_URL}/surfy_card_1.png`
        }
        console.log('cardAsset', cardAsset)
        console.log('image', ctx.message?.requesterUserData?.profileImage)
        return {
            image: (
                <div style={{ display: "flex", width: '1080px', height: '1080px' }}>
                    <div style={{ display: "flex", width: '1080px', height: '1080px' }}>
                        <img style={{ width: '1080px', height: '1080px', zIndex: 30 }} src={cardAsset} alt={cardAsset} />
                        <div style={{ top: '554', left: '173', position: "absolute", display: "flex", flexDirection: "column", zIndex: 50 }}>
                            <img style={{ display: "flex", width: '100px', height: '100px', borderRadius: "15px" }} src={ctx.message?.requesterUserData?.profileImage} />
                            <p style={{ color: textColor, marginTop: "10px" }}>{ctx.message?.requesterUserData?.displayName}</p>
                        </div>
                    </div>
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
    }

    return {
        image: `${NEXT_PUBLIC_URL}/mint_your_surfy.png`,
        imageOptions: {
            width: 1080,
            height: 1080,
            aspectRatio: "1:1"
        },
        buttons: [
            <Button action="mint" target={getTokenUrl({ address: "0x313714Fc7BfFFcBc5d1F60a6D7E3A3cCBEf5cc36", chain: base, tokenId: "1"})} >
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
