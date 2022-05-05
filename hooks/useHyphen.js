import { ethers } from "ethers"
import { useAccountContext } from "../context"

const  useHyphen = () => {	
	const HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1"
	const TESTNET_HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1"

	const getTransferFees = async (fromChainId, toChainId, tokenAddress, amount) => {
		return new Promise(async (resolve, reject) => {
			try {
				const res = await fetch(`${HYPHEN_BASE_URL}/data/transferFee?fromChainId=${fromChainId}&toChainId=${toChainId}&tokenAddress=${tokenAddress}&amount=${amount}`)
				if(res.status >= 400) throw "Error 404"
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
		const abi = [{"inputs":[{"internalType":"address","name":"_hyphen","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"AmountNotZero","type":"error"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"toChainId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"FundsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_receiver","type":"address"},{"internalType":"uint256","name":"toChainId","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"transferNative","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
		try {
			const { ethereum } = window
			if (ethereum) {
				const accounts = await ethereum.request({ method: "eth_accounts" });
		
				if (accounts.length !== 0) {
					const provider = new ethers.providers.Web3Provider(ethereum)
					const signer = await provider.getSigner()

					const contract = new ethers.Contract('0x6A53Aa62dba933aEcd25B3d37F9878136d74E850', abi, signer)
					const address = await signer.getAddress()
					const tx = await contract.transferNative(address, address, 1, '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee', ethers.utils.parseEther('1'), { value: ethers.utils.parseEther('1') })
					console.log(tx)
					console.log(accounts[0]);
				} else {
					console.log("Do not have access");
				}
			} else {
				console.log("Install Metamask");
			}
		} catch (e) {
			console.log(e);
		}
		
	}

	return [getTransferFees, bridge]
}

export default useHyphen