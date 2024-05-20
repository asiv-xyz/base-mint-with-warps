import { frames } from "../../frames";
import React from "react";
import {isUserHasNft} from "../../utils/nft";
import {NeynarAPIClient} from "@neynar/nodejs-sdk";
import {NEXT_PUBLIC_URL} from "../../../config";
import {Button} from "frames.js/next";
import {getTokenUrl} from "frames.js";
import {base} from "viem/chains";

const handleRequest = frames(async (ctx) => {
    console.log('card: handleRequest')
    const client = new NeynarAPIClient('C0BA4DAC-4197-4CCF-922F-8142E550E356');
    const fids: string[] = ctx.url.pathname.split('/')
    if (fids.length == 0) {
        return {
            image: (<>User doesn't have fid.</>),
            imageOptions: {
                width: 1080, height: 1080, aspectRatio: "1:1"
            }
        }
    }
    const fid = fids[fids.length - 1]
    const addresses = await client.fetchBulkUsers([parseInt(fid)])
    const ethAddresses = addresses.users[0].verified_addresses.eth_addresses
    const name = addresses.users[0].display_name
    const profile = addresses.users[0].pfp_url
    const hasNft = await isUserHasNft(ethAddresses)
    if (hasNft == null) {
        return {
            image: (<>User doesn't have SURFY card NFT.</>),
            imageOptions: {
                width: 1080, height: 1080, aspectRatio: "1:1"
            }
        }
    }
    console.log('card: hasNft', hasNft)
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
    console.log('cardAsset', cardAsset)

    return {
        image: (
            <div style={{display: "flex", width: '1080px', height: '1080px', padding: '0px', margin: '0px'}}>
                <img style={{width: '1080px', height: '1080px', zIndex: 30}} src={cardAsset} alt={cardAsset}/>
                <div style={{
                    top: '554',
                    left: '173',
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    zIndex: 50
                }}>
                    <img style={{display: "flex", width: '100px', height: '100px', borderRadius: "15px"}}
                         src={profile}/>
                    <p style={{color: textColor, marginTop: "10px", fontSize: "28px"}}>{name}</p>
                </div>
            </div>
        ),
        imageOptions: {
            width: 1080, height: 1080, aspectRatio: "1:1"
        },
        buttons: [
            <Button action="mint" target={getTokenUrl({ address: "0x313714Fc7BfFFcBc5d1F60a6D7E3A3cCBEf5cc36", chain: base, tokenId: "1"})} >
                Mint
            </Button>,
            <Button action="link" target="https://www.surfy.network">
                About SURFY
            </Button>,
        ],
    }
});

export const GET = handleRequest;
export const POST = handleRequest;
