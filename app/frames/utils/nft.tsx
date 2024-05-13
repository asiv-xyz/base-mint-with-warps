import {createPublicClient, http} from "viem";
import {base} from "viem/chains";
import {abi} from "../../abi/surfyCard";

export const isUserHasNft = async (addresses: string[] | undefined) => {
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
