import { Button } from "frames.js/next";
import { frames } from "../frames";
import {NEXT_PUBLIC_URL} from "../../config";
import {base} from "viem/chains";
import React from "react";
import {getTokenUrl} from "frames.js";
import {isUserHasNft} from "../utils/nft";

const handleRequest = frames(async (ctx) => {
    console.log('handleRequest')
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
        return {
            image: (
                <div style={{ display: "flex", width: '1080px', height: '1080px', padding: '0px', margin: '0px' }}>
                    <img style={{ width: '1080px', height: '1080px', zIndex: 30 }} src={cardAsset} alt={cardAsset} />
                    <div style={{ top: '554', left: '173', position: "absolute", display: "flex", flexDirection: "column", zIndex: 50 }}>
                        <img style={{ display: "flex", width: '100px', height: '100px', borderRadius: "15px" }} src={ctx.message?.requesterUserData?.profileImage} />
                        <p style={{ color: textColor, marginTop: "10px", fontSize: "28px" }}>{ctx.message?.requesterUserData?.displayName}</p>
                    </div>
                </div>
            ),
            imageOptions: {
                width: 1080,
                height: 1080,
                aspectRatio: "1:1"
            },
            buttons: [
                <Button action="mint" target={getTokenUrl({ address: "0x313714Fc7BfFFcBc5d1F60a6D7E3A3cCBEf5cc36", chain: base, tokenId: "1"})} >
                    Mint
                </Button>,
                <Button action="link" target={`https://warpcast.com/~/compose?embeds[]=${NEXT_PUBLIC_URL}/frames/card/${ctx.message?.requesterFid}&text=Pay crypto with /surfy! I minted my onchain card!`} >
                    Share
                </Button>,
                <Button action="link" target="https://www.surfy.network">
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
            <Button action="link" target="https://www.surfy.network">
                About SURFY
            </Button>,
        ],
    };
});

export const GET = handleRequest;
export const POST = handleRequest;
