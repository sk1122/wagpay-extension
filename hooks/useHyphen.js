const  useHyphen = () => {
	const HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1"
	const TESTNET_HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1"

	const getTransferFees = async (fromChainId, toChainId, tokenAddress, amount) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(`${HYPHEN_BASE_URL}/data/transferFee?fromChainId=${fromChainId}&toChainId=${toChainId}&tokenAddress=${tokenAddress}&amount=${amount}`)
				const data = await res.json()
	
				let fees = {
					gas: data["gasFee"],
					amountToGet: data["amountToGet"],
					transferFee: data["transferFee"],
					transferFeePerc: data["transferFeePercentage"]
				}
	
				resolve(fees)
			} catch (e) {
				reject(e)
			}
		})
	}

	const bridge = async (fromChainId, toChainId, tokenAddress, amount) => {
		console.log("Bridging")
	}

	return [getTransferFees, bridge]
}

export default useHyphen