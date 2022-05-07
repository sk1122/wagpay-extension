import { useState, useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
const INFURA_ID = "460f40a260564ac4a4f4b3fffb032dad";
import { ethers } from "ethers";
import { useAccountContext } from "../context";
import useBridge from "../hooks/useBridge";
import useHyphen from "../hooks/useHyphen"
import {
  Intro,
  InputForToken,
  SelectBridge,
  SelectToken,
  BadgeButton,
  WalletOptionModal,
} from "./componets";

const chainIds = {
  'ETH': 1,
  'MATIC': 137
}

const tokenAddress = {
	1: {
		'ETH': '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
		'WETH': '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
		'USDC': '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
		'USDT': '0xdac17f958d2ee523a2206206994597c13d831ec7',
		'MATIC': ''
	},
	137: {
		'ETH': '0x7ceb23fd6bc0add59e62ac25578270cff1b9f619',
		'USDT': '0xc2132D05D31c914a87C6611C10748AEb04B58e8F',
		'USDC': '0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174',
		'MATIC': '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee'
	}
}

function WagPay() {
  const {
    BaseToken,
    setBaseToken,
    ToToken,
    setToToken,
    BaseTokenValue,
    setBaseTokenValue,
    ToTokenValue,
    setToTokenValue,
  } = useAccountContext();
  const [showModal, setShowModal] = useState(false)
  const [connectWallet, setConnectWallet] = useState("")

  const [chooseBridge, checkLowGasFees] = useBridge();
  const [getTransferFees, bridge] = useHyphen()
  const [data, setData] = useState({});

  const [selectedRoute, setSelectedRoute] = useState({})


  const connectETH = async () => {
    const providerOptions = {
      walletconnect: {

        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
          rpc: {
            1: "https://mainnet.infura.io/v3/" + process.env.myINFURA_ID,
            42: "https://kovan.infura.io/v3/" + process.env.myINFURA_ID,
            137:
              "https://polygon-mainnet.infura.io/v3/" + process.env.myINFURA_ID,
            80001: "https://rpc-mumbai.matic.today",
          },
        },
        display: {
          description: "Scan with a wallet to connect",
        },
      },
    };
    const web3modal = new Web3Modal({
      providerOptions,
    });

    try {
      const provider = await web3modal.connectTo("walletconnect");
      const ethProvider = new ethers.providers.Web3Provider(provider);
      setProvider(ethProvider);
      return provider;
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if(BaseTokenValue.toString().length >= 1) {
      const baseToken = JSON.parse(BaseToken)
      const toToken = JSON.parse(ToToken)
      if(baseToken && toToken) {
        const baseTokenAddress = tokenAddress[baseToken.chainId][baseToken.name]
        console.log(baseToken, toToken)
        const toTokenAddress = tokenAddress[toToken.chainId][toToken.name]
        // console.log(BaseToken, ToToken, tokenAddress[baseTokenChainId], baseTokenAddress, toTokenAddress, baseTokenChainId, toTokenChainId)
    
        chooseBridge(baseToken.chainId, toToken.chainId, baseTokenAddress, toTokenAddress, ethers.utils.parseEther(BaseTokenValue.toString()), baseToken, toToken)
          .then(a => {console.log(a);setSelectedRoute(a[0])})
      }
    }
  }, [BaseTokenValue, BaseToken, ToToken]);

  return (
    <div className="text-white  overflow-hidden relative w-[500px] max-w-2xl bg-[#191926] px-4 py-6 h-[600px]" onClick={() => setShowModal(false)}>
      <div className=" w-full flex justify-center  mb-9  ">
        <h1 className="font-bold text-4xl text-center">WagPay</h1>
      </div>
      <div>
        <h2>I WANT TO SWAP</h2>
        <div className="flex justify-between bg-slate-900 my-2">
          <InputForToken value={BaseTokenValue} setValue={setBaseTokenValue} />
          <SelectToken token={BaseToken} setToken={setBaseToken} />
        </div>
        <h1>TO</h1>
        <div className="flex justify-between bg-slate-900 my-2">
          <InputForToken value={ToTokenValue} setValue={ToTokenValue} />
          <SelectToken token={ToToken} setToken={setToToken} />
        </div>
      </div>

      <div className="py-6">
        <p className="text-sm font-bold ">
          Gas fees will be :{" "}
          <span className=" text-white text-2xl">
            {selectedRoute.gas ? selectedRoute.gas.substring(0, 4) : ""}
            {ethers.constants.EtherSymbol}
          </span>
        </p>
        <p className="text-sm font-bold text-[#27AE60] ">
          Bridge fees will be :{" "}
          <span className="text-white text-2xl">
            {selectedRoute.transferFee ? selectedRoute.transferFee.substring(0, 4) : ""}
            {ethers.constants.EtherSymbol}
          </span>
        </p>
        <p className="text-sm font-bold text-[#2D9CDB] ">
          You will receive :{" "}
          <span className="text-white text-2xl">
            {selectedRoute.amountToGet ? selectedRoute.amountToGet.substring(0, 4) : ""}
            {ethers.constants.EtherSymbol}
          </span>
        </p>
      </div>
      <div>
        <SelectBridge />
      </div>
      <div className="w-full flex justify-center py-10 text-sm">
        <button
          className="bg-[#49755B] cursor-pointer px-6 py-4 flex items-center"
          // onClick={(e) => {
          //   e.stopPropagation();
          //   setShowModal(!showModal)
          // }}
          onClick={() => bridge(selectedRoute, 137, 1, tokenAddress[137]['MATIC'], BaseTokenValue)}
        >
          WagPay <AiFillThunderbolt className="ml-3 text-yellow-500" />
        </button>
      </div>
      <WalletOptionModal showModal={showModal} setShowModal={setShowModal} connectETH={connectETH} />
    </div>

  );
}

export default function Home() {
  const [isSettingOpen, setIsSettingOpen] = useState(false);
  const [nextScreen, setNextScreen] = useState(true);

  return (
    <>
      <div className="h-screen w-screen bg-gray-800 flex items-center justify-center">
        {nextScreen ? (
          <Intro nextScreen={nextScreen} setNextScreen={setNextScreen} />
        ) : (
          <WagPay />
        )
        }

      </div>
    </>
  );
}
