import { useEffect } from "react"
import routes from "../../routes/routes.json"

const SelectBridge = () => {
    const toToken = "ETH"
    const fromToken = "MATIC"
    
    useEffect(() => {
        routes.available_routes[fromToken][toToken].map(route => {
            route.route.map(r => {
                console.log(r)
            })
        })
    }, [])

    return (
        <>
            <select className="bg-slate-800 text-sm font-bold p-2 m-auto">
                {routes.available_routes[fromToken][toToken].map(route => {
                    return route.route.map(r => {
                        console.log(r, "r")
                        return <option>{r}</option>
                    })
                })}
            </select>
        </>
    )
}

export default SelectBridge;