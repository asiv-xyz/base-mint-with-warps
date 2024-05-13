import { frames } from "../../frames";
import React from "react";
import {isUserHasNft} from "../../utils/nft";
import {NeynarAPIClient} from "@neynar/nodejs-sdk";
import {NEXT_PUBLIC_URL} from "../../../config";
import {createImagesWorker} from "frames.js/middleware/images-worker/next";

const handleRequest = frames(async (ctx) => {
    console.log('handleRequest')
    const fids: string[] = ctx.url.pathname.split('/')
    if (fids.length == 0) {
        return {
            image: (<>Something was wrong...</>),
            imageOptions: {
                width: 1080, height: 1080, aspectRatio: "1:1"
            }
        }
    }
    console.log('fid', fids[fids.length - 1])
    const fid = fids[fids.length - 1]
    const client = new NeynarAPIClient('C0BA4DAC-4197-4CCF-922F-8142E550E356');
    console.log('fid', fid)
    const addresses = await client.fetchBulkUsers([parseInt(fid)])
    const ethAddresses = addresses.users[0].verified_addresses.eth_addresses
    const hasNft = await isUserHasNft(ethAddresses)
    if (hasNft == null) {
        return {
            image: (<>Something was wrong...</>),
            imageOptions: {
                width: 1080, height: 1080, aspectRatio: "1:1"
            }
        }
    }
    console.log('hasNft', hasNft)
    let cardAsset
    let textColor
    const last = parseInt(hasNft.at(5) || '0') % 5
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
                    <p style={{ color: textColor, marginTop: "10px" }}>{ctx.message?.requesterUserData?.displayName}</p>
                </div>
            </div>
        ),
        imageOptions: {
            width: 1080, height: 1080, aspectRatio: "1:1"
        }
    }
});

export const GET = handleRequest;
export const POST = handleRequest;
