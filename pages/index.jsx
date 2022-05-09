import { MdArrowBackIosNew } from "react-icons/md";
import { useState, useEffect } from "react";
import { AiFillThunderbolt } from "react-icons/ai";
import { useAccountContext } from "../context";
import { ethers } from "ethers";
import useBridge from "../hooks/useBridge";
import useHyphen from "../hooks/useHyphen"
import Hero from "./componets/hero";
import SelectToken from "./componets/SelectToken";


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


  const tokens = [
    {
      name: "ETH",
      value: JSON.stringify({
        name: "ETH",
        chainId: 1,
        decimals: 18,
      }),
    },
    {
      name: "MATIC",
      value: JSON.stringify({
        name: "MATIC",
        chainId: 137,
        decimals: 18,
      }),
    },
    {
      name: "USDT (ETH)",
      value: JSON.stringify({
        name: "USDT",
        chainId: 1,
        decimals: 6,
      }),
    },
    {
      name: "USDT (MATIC)",
      value: JSON.stringify({
        name: "USDT",
        chainId: 137,
        decimals: 6,
      }),
    },
  ];


  const chains = [
    {
      name: "Etherium",
      value: JSON.stringify({
        name: "ETH",
        chainId: 1,
        decimals: 18,
      }),
    },
    {
      name: "Polygon",
      value: JSON.stringify({
        name: "Polygon",
        chainId: 137,
        decimals: 18,
      }),
    }
  ]




  useEffect(() => {
    console.log(BaseToken, ToToken)
    const baseToken = JSON.parse(BaseToken)
    const toToken = JSON.parse(ToToken)
    if (baseToken && toToken) {
      const baseTokenAddress = tokenAddress[baseToken.chainId][baseToken.name]
      console.log(baseToken, toToken)
      const toTokenAddress = tokenAddress[toToken.chainId][toToken.name]
      // console.log(BaseToken, ToToken, tokenAddress[baseTokenChainId], baseTokenAddress, toTokenAddress, baseTokenChainId, toTokenChainId)

      chooseBridge(baseToken.chainId, toToken.chainId, baseTokenAddress, toTokenAddress, ethers.utils.parseUnits(BaseTokenValue.toString(), 6), baseToken, toToken)
        .then(a => { setToTokenValue(a[0].amountToGet.substring(0, 4)); setSelectedRoute(a[0]) })
    }
  }, [BaseTokenValue, BaseToken, ToToken]);

  return (
    <div className="text-white  overflow-hidden relative w-full  bg-[#191926] px-4 py-2 h-[600px]" onClick={() => {

      setShowModal(false)
    }}>
      <Hero />
      <SelectChain chains={chains} />
      <SelectToken tokens={tokens} />
      <div className="w-full my-3">
        <div className="w-full flex justify-between">
          <p>Gass fees</p>
          <p> {selectedRoute.gas ? selectedRoute.gas.substring(0, 4) : ""}
            {ethers.constants.EtherSymbol}</p>
        </div>
        <div className="w-full flex justify-between my-2">
          <p>Slipage</p>
          <p> {selectedRoute.transferFee ? selectedRoute.transferFee.substring(0, 4) : ""}
            {ethers.constants.EtherSymbol}</p>
        </div>
        <div className="w-full flex justify-between ">
          <p>Bridge fees</p>
          <p> {selectedRoute.amountToGet ? selectedRoute.amountToGet.substring(0, 4) : ""}
            {ethers.constants.EtherSymbol}</p>
        </div>
      </div>

      <div className="w-full flex items-center justify-center bg-[#4F54DA] rounded-full">
        <button
          className=" py-4 flex items-center"
          onClick={() => bridge(selectedRoute, 137, 1, tokenAddress[137][JSON.parse(BaseToken).name.toUpperCase()], BaseTokenValue.toString(), tokenAddress[1][JSON.parse(ToToken).name.toUpperCase()])}
        >
          WagPay <AiFillThunderbolt className="ml-3 text-yellow-500" />
        </button>
      </div>
    </div >

  );
}

export default function Home() {
  const [nextScreen, setNextScreen] = useState(false);

  return (
    <>
      {!nextScreen ? (
        <Intro nextScreen={nextScreen} setNextScreen={setNextScreen} />
      ) : (
        <WagPay />
      )
      }


    </>
  );
}