export const abi = [
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'nextTokenId',
        outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'account',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'balanceOf',
        outputs: [{ name: '', internalType: 'address', type: 'address' }],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: 'minter',
                internalType: 'contract IMinter1155',
                type: 'address',
            },
            { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
            { name: 'quantity', internalType: 'uint256', type: 'uint256' },
            { name: 'minterArguments', internalType: 'bytes', type: 'bytes' },
            { name: 'mintReferral', internalType: 'address', type: 'address' },
        ],
        name: 'mintWithRewards',
        outputs: [],
    },
]
