const useBridge = () => {
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
				const uniswapFees = await getUniswapFees(tokenAddress[toChainId][fromTokenName], toTokenAddress, amount)

				for(let i = 0; i < routes.length; i++) {
					// TODO: Implement getRouteFees
					const fees = await getRouteFees(routes[i].route)

					routes[i].route.gasFees = fees.gasFees
					routes[i].route.amountToGet = fees["amountToGet"]
					routes[i].route.transferFee = fees["transferFee"]
					routes[i].route.uniswapFees = uniswapFees
				}

				resolve(routes)
			} else {
				for(let i = 0; i < routes.length; i++) {
					// TODO: Implement getRouteFees
					const fees = await getRouteFees(routes[i].route)

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

	return [chooseBridge]
}

export default useBridge