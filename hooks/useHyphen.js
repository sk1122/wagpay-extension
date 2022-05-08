import { ethers } from "ethers"
import { useAccountContext } from "../context"

const  useHyphen = () => {	
	const HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1"
	const TESTNET_HYPHEN_BASE_URL = "https://hyphen-v2-api.biconomy.io/api/v1"
	const NATIVE_ADDRESS = "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee"

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

	const bridge = async (route, fromChainId, toChainId, tokenAddress, amount) => {
		const abi = [{"inputs":[{"internalType":"address","name":"_hyphen","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"toChainId","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"},{"indexed":false,"internalType":"address","name":"tokenAddress","type":"address"}],"name":"ERC20FundsTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"receiver","type":"address"},{"indexed":false,"internalType":"uint256","name":"toChainId","type":"uint256"}],"name":"NativeFundsTransferred","type":"event"},{"inputs":[{"internalType":"uint256","name":"toChainId","type":"uint256"},{"internalType":"address","name":"tokenAddress","type":"address"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"tag","type":"string"}],"name":"transferERC20","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"address","name":"receiver","type":"address"},{"internalType":"uint256","name":"toChainId","type":"uint256"},{"internalType":"string","name":"tag","type":"string"}],"name":"transferNative","outputs":[],"stateMutability":"payable","type":"function"}]
		try {
			const { ethereum } = window
			if (ethereum) {
				const accounts = await ethereum.request({ method: "eth_accounts" });
		
				if (accounts.length !== 0) {
					const provider = new ethers.providers.Web3Provider(ethereum)
					const signer = await provider.getSigner()

					const contract = new ethers.Contract('0x2C0F951287332AB8c342AD4254F0C0246ef19ec5', abi, signer)
					const address = await signer.getAddress()
					var tx;
					console.log(tokenAddress, "31")
					if(tokenAddress.toLowerCase() == NATIVE_ADDRESS.toLowerCase()) {
						tx = await contract.transferNative(ethers.utils.parseEther(amount), address, toChainId, "s", { value: ethers.utils.parseEther(amount) })
					} else {
						let erc20abi = ["function approve(address _spender, uint256 _value) public returns (bool success)"]
						let erc20 = new ethers.Contract(tokenAddress, erc20abi, signer)
						await erc20.approve(contract.address, ethers.utils.parseEther(amount))
						tx = await contract.transferERC20(toChainId, tokenAddress, address, ethers.utils.parseEther(amount))
					}
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