const SelectToken = ({ token, setToken }) => {

    const tokens = [
        {
            name: "ETH",
            value: JSON.stringify({
                name: "ETH",
                chainId: 1,
                decimals: 18
            })
        },
        {
            name: "MATIC",
            value: JSON.stringify({
                name: "MATIC",
                chainId: 137,
                decimals: 18
            })
        },
        {
            name: "USDC (ETH)",
            value: JSON.stringify({
                name: "USDC",
                chainId: 1,
                decimals: 6
            })
        },
        {
            name: "USDC (MATIC)",
            value: JSON.stringify({
                name: "USDC",
                chainId: 137,
                decimals: 6
            })
        }
    ]


    return (
        <select

            onChange={(e) => {
                setToken(e.target.value)
            }}
            className="bg-black flex items-center px-6 py-2 text-sm focus:outline-none">
            <option value="" selected>Select Token</option>
            {tokens.map(token => {
                return <option value={token.value} key={token.name}>{token.name}</option>
            })}
        </select>
    )
}

export default SelectToken;