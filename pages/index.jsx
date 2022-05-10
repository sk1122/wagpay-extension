import { useState, useEffect } from "react";
import { useAccountContext, useDropDownContext } from "../context";
import { ethers } from "ethers";
import useBridge from "../hooks/useBridge";
import useHyphen from "../hooks/useHyphen"
import Intro from "./intro";
import { TransectionDetails, SelectChain, SelectToken, Hero, WagPayBtn } from "./componets"


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


const tokens = [
  {
    name: "ETH",
    value: JSON.stringify({
      name: "ETH",
      chainId: 1,
      decimals: 18,
    }),
    logo: "/eth.svg"
  },
  {
    name: "MATIC",
    value: JSON.stringify({
      name: "MATIC",
      chainId: 137,
      decimals: 18,
    }),
    logo: "/poly.svg"
  },
  {
    name: "USDT (ETH)",
    value: JSON.stringify({
      name: "USDT",
      chainId: 1,
      decimals: 6,
    }),
    logo: "/usdc.svg"
  },
  {
    name: "USDT (MATIC)",
    value: JSON.stringify({
      name: "USDT",
      chainId: 137,
      decimals: 6,
    }),
    logo: "/usdc.svg"
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
    logo: "/eth.svg"
  },
  {
    name: "Polygon",
    value: JSON.stringify({
      name: "Polygon",
      chainId: 137,
      decimals: 18,
    }),
    logo: "/poly.svg"
  }
]


function WagPay() {
  const {
    amount,
    setAmount,
    BaseToken,
    setBaseToken,
    ToToken,
    setToToken,
    BaseTokenValue,
    setBaseTokenValue,
    ToTokenValue,
    setToTokenValue,
    BaseChain, setBaseChain,
    toChain, setToChain
  } = useAccountContext();
  const { closeDropdowns } = useDropDownContext()
  const [showModal, setShowModal] = useState(false)
  const [chooseBridge, checkLowGasFees] = useBridge();
  const [getTransferFees, bridge] = useHyphen()
  const [selectedRoute, setSelectedRoute] = useState({})

  useEffect(() => {
    console.log(BaseToken, ToToken)
    const baseToken = JSON.parse(BaseToken.value)
    const toToken = JSON.parse(ToToken.value)
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
    <div className="text-white text-sm overflow-hidden relative w-full  bg-[#191926] px-4 py-2 h-[600px]" onClick={() => {
      closeDropdowns(false)
      setShowModal(false)
    }}>
      <Hero />

      <SelectChain chains={chains} />
      <SelectToken tokens={tokens} />
      <TransectionDetails />
      <WagPayBtn />
      <div>
        {BaseChain ? BaseChain.name : null}
        {toChain ? toChain.name : null}
        {BaseToken ? BaseToken.name : null}
        {ToToken ? ToToken.name : null}
      </div>
    </div>
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