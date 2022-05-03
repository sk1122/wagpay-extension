const SelectToken = ({ token, setToken }) => {

    const tokens = [
        {
            name: "select Token",
            value: token
        },
        {
            name: "ETH",
            value: "eth"
        },
        {
            name: "MATIC",
            value: "matic"
        },
        {
            name: "SOL",
            value: "sol"
        }
    ]


    return (
        <select onChange={(e) => {
            setToken(e.target.value)
        }} className="bg-black flex items-center px-6 py-2 text-sm focus:outline-none">
            {tokens.map(token => {
                return <option value={token.value} key={token.name}>{token.name}</option>
            })}
        </select>
    )
}

export default SelectToken;