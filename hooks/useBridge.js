import { ethers } from "ethers"
import useHyphen from "./useHyphen"
import rpc from "../routes/rpc.json"

const useBridge = () => {
	const [getTransferFees, bridge] = useHyphen()
	
	const checkLowGasFees = async (chainId1, chainId2) => {
		console.log(rpc)
		const provider1 = new ethers.providers.JsonRpcProvider(rpc[chainId1])
		const provider2 = new ethers.providers.JsonRpcProvider(rpc[chainId2])
		
		console.log(await provider1.getGasPrice(), "1")
		console.log(await provider2.getGasPrice(), "2")
	} 

	const getUniswapFees = async (tokenAddress, toTokenAddress, chainId, amount) => {

	}

	const getRouteFees = async (routeName, fromChainId, toChainId, amount) => {
		if(routeName === 'HYPHEN') {
			getTransferFees(fromChainId, toChainId, tokenAddress, amount)
		}
	}
	
	const chooseBridge = (fromChainId, toChainId, fromTokenAddress, toTokenAddress, amount) => {
		return new Promise(async (resolve, reject) => {
			const fromTokenName = tokenNames[fromChainId][fromTokenAddress]
			const toTokenName = tokenNames[toChainId][toTokenAddress]
	
			const UNISWAP_REQUIRED = fromTokenName === toTokenName

			let routes = available_routes[fromChainId][fromTokenName][toChainId]
	
			if(routes.length <= 0) {
				reject("No Route Found")
				return
			}

			if(UNISWAP_REQUIRED) {
				// TODO: Implement checkLowGasFees
				const uniswapBeforeBridge = await checkLowGasFees(fromChainId, toChainId)

				// @dev - {
				// 	gasFees: number,
				// 	transferFees: number,
				// 	totalFees: number,
				// 	amountToGet: number
				// }
				// TODO: Implement getUniswapFees
				const uniswapFees = await getUniswapFees(tokenAddress[toChainId][fromTokenName], toTokenAddress, toChainId, amount)

				for(let i = 0; i < routes.length; i++) {
					// TODO: Implement getRouteFees
					const fees = await getRouteFees(routes[i].route, fromChainId, toChainId, amount)

					routes[i].route.gasFees = fees.gasFees
					routes[i].route.amountToGet = fees["amountToGet"]
					routes[i].route.transferFee = fees["transferFee"]
					routes[i].route.uniswapFees = uniswapFees
				}

				resolve(routes)
			} else {
				for(let i = 0; i < routes.length; i++) {
					// TODO: Implement getRouteFees
					const fees = await getRouteFees(routes[i].route, fromChainId, toChainId, amount)

					routes[i].route.gasFees = fees.gasFees
					routes[i].route.amountToGet = fees["amountToGet"]
					routes[i].route.transferFee = fees["transferFee"]
				}

				const routes = []

				const sorted = await routes.sort((x, y) => {
					if(x.route.amountToGet > y.route.amountToGet) {
						return x
					} else if(x.route.gasFees < y.route.gasFees) {
						return x
					} else {
						return y
					}
				})

				resolve(sorted)
			}
		})
	}

	return [chooseBridge, checkLowGasFees]
}

export default useBridge