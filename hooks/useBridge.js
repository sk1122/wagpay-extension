import { ethers } from "ethers"
import useHyphen from "./useHyphen"
import rpc from "../routes/rpc.json"
import route from "../routes/route2.json"
import useHop from "./useHop"
import { Chain } from "@hop-protocol/sdk"

const tokenNames = {
	1: {
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 'ETH',
		'0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48': 'USDC'
	},
	137: {
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 'MATIC',
		'0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174': 'USDC'
	}
}

const useBridge = () => {
	const [getTransferFees, bridge] = useHyphen()
	const [get, b] = useHop()
	
	const checkLowGasFees = async (chainId1, chainId2) => {
		console.log(rpc[chainId1])
		const provider1 = new ethers.providers.JsonRpcProvider(rpc[chainId1].rpc[0])
		const provider2 = new ethers.providers.JsonRpcProvider(rpc[chainId2].rpc[0])
		
		const gas1 = Number(ethers.utils.formatUnits(await provider1.getGasPrice(), 'gwei')) / 1000000000
		const gas2 = Number(ethers.utils.formatUnits(await provider2.getGasPrice(), 'gwei')) / 1000000000

		let data = await fetch(rpc[chainId1].price)
		const price1 = await data.json()

		data = await fetch(rpc[chainId2].price)
		const price2 = await data.json()

		return (gas1 * price1) >= (gas2 * price2)
	} 

	const getUniswapFees = async (tokenAddress, toTokenAddress, chainId, amount) => {
		return {
			gasFees: 12,
			transferFees: 21,
			totalFees: 32,
			amountToGet: 45
		}
	}

	const getRouteFees = async (route, fromChainId, toChainId, tokenAddress, amount) => {
		console.log(route)
		if(route.name === 'HYPHEN') {
			const fees = await getTransferFees(fromChainId, toChainId, tokenAddress, amount)
			return fees
		} else {
			const fees = await get(Chain.Ethereum, Chain.Polygon, tokenAddress, amount)
			return fees
		}
	}
	
	const chooseBridge = (fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount) => {
		return new Promise(async (resolve, reject) => {
			const fromTokenName = tokenNames[fromChainId][fromTokenAddress]
			const toTokenName = tokenNames[toChainId][toTokenAddress]
	
			const UNISWAP_REQUIRED = fromTokenName === toTokenName
			var routes = route.available_routes[fromChainId][fromTokenName][toChainId]
			console.log(routes)
	
			if(routes.length <= 0) {
				reject("No Route Found")
				return
			}

			if(UNISWAP_REQUIRED) {
				// TODO: Implement checkLowGasFees
				const uniswapBeforeBridge = await checkLowGasFees(fromChainId, toChainId)
				
				const uniswapFees = await getUniswapFees(tokenAddress[toChainId][fromTokenName], toTokenAddress, toChainId, amount)

				for(let i = 0; i < routes.length; i++) {
					// TODO: Implement getRouteFees
					const fees = await getRouteFees(routes[i], fromChainId, toChainId, amount)

					routes[i].route.gasFees = fees.gasFees
					routes[i].route.amountToGet = fees["amountToGet"]
					routes[i].route.transferFee = fees["transferFee"]
					routes[i].route.uniswapFees = uniswapFees
				}

				resolve(routes)
			} else {
				for(let i = 0; i < routes.length; i++) {
					// TODO: Implement getRouteFees
					const fees = await getRouteFees(routes[i], fromChainId, toChainId, toTokenAddress, amount)
					console.log(fees)
					routes[i].gasFees = fees.gas
					routes[i].amountToGet = fees["amountToGet"]
					routes[i].transferFee = fees["transferFee"]
				}

				const sorted = routes.sort((x, y) => {
					if(Number(x.amountToGet) < Number(y.amountToGet)) {
						return -1
					} else if(Number(x.gasFees) < Number(y.gasFees)) {
						return -1
					} else {
						return 1
					}
				})
				console.log(sorted, "SORTED")

				resolve(routes)
			}
		})
	}

	return [chooseBridge, checkLowGasFees]
}

export default useBridge