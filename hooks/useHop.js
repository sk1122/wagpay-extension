import { Hop, Chain } from "@hop-protocol/sdk"
import { ethers } from "ethers"

const tokenNames = {
	1: {
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 'ETH'
	},
	137: {
		'0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee': 'MATIC'
	}
}

const  useHop = () => {
	const getTransferFees = async (fromChainId, toChainId, tokenAddress, amount, signer) => {
		return new Promise(async (resolve, reject) => {
			console.log(tokenNames[fromChainId.chainId][tokenAddress])
			try {
				const hop = new Hop('mainnet')
				const bridge = hop.connect(signer).bridge(tokenNames[fromChainId.chainId][tokenAddress])

				let sendData = await bridge.getSendData(amount, fromChainId, toChainId)
				const keys = Object.keys(sendData)
				
				for(let i = 0; i < keys.length; i++ ) {
					if(typeof(sendData[keys[i]]) == 'object') {
						sendData[keys[i]] = sendData[keys[i]].toString()
					}
				}

				let fees = {
					gas: 0,
					amountToGet: ethers.utils.formatUnits(sendData["estimatedReceived"], 18),
					transferFee: ethers.utils.formatUnits(sendData["adjustedBonderFee"], 18)
				}

				console.log(fees)

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

export default useHop