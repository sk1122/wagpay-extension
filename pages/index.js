import { useState, useEffect } from "react";
import { AiFillCaretDown, AiFillDollarCircle, AiFillThunderbolt } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { BadgeButton } from "./componets/BadgeButton";
import InputForToken from "./componets/InputForToken";
import Intro from "./componets/intro";
import SelectBridge from "./componets/SelectBridge";
import SelectToken from "./componets/SelectToken";
import Web3Modal from 'web3modal';
import WalletConnectProvider from '@walletconnect/web3-provider'
import Authereum from "authereum";
const INFURA_ID = '460f40a260564ac4a4f4b3fffb032dad';
import { ethers } from "ethers";


function WagPay() {
  const connectETH = async () => {
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider,
        options: {
          infuraId: INFURA_ID,
          rpc: {
            1: "https://mainnet.infura.io/v3/" + process.env.myINFURA_ID,
            42: "https://kovan.infura.io/v3/" + process.env.myINFURA_ID,
            137: "https://polygon-mainnet.infura.io/v3/" + process.env.myINFURA_ID,
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
    })

    try {
      const provider = await web3modal.connectTo("walletconnect")
      const ethProvider = new ethers.providers.Web3Provider(provider)
      setProvider(ethProvider)
      return provider
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <div className="text-white h-full overflow-hidden relative w-[400px] max-w-2xl bg-[#191926] px-4 py-6 ">
      <div className=" w-full flex justify-center  mb-9  ">
        <h1 className="font-bold text-4xl text-center">WagPay</h1>
      </div>

      <div>
        <h2>I WANT TO SWAP</h2>
        <div className="flex justify-between bg-slate-900 my-2">
          <InputForToken />
          <SelectToken />
        </div>
        <h1>TO</h1>
        <div className="flex justify-between bg-slate-900 my-2">
          <InputForToken />
          <SelectToken />
        </div>
      </div>


      <div className="py-6">
        <p className="text-sm font-bold ">Gas fees will be : <span className=" text-white text-2xl">{12}</span></p>
        <p className="text-sm font-bold text-[#27AE60] ">slippage fees wil be  : <span className="text-white text-2xl">{12}</span></p>
        <p className="text-sm font-bold text-[#2D9CDB] ">Bridge fess wil be  : <span className="text-white text-2xl">{12}</span></p>
      </div>
      <div>
        <SelectBridge />
      </div>
      <div className="w-full flex justify-center py-10 text-sm">
        <button className="bg-[#49755B] cursor-pointer px-6 py-4 flex items-center " onClick={connectETH}>WagPay <AiFillThunderbolt className="ml-3 text-yellow-500" /></button>
      </div>
    </div>
  )
}


export default function Home() {

  const [isSettingOpen, setIsSettingOpen] = useState(false)
  const [nextScreen, setNextScreen] = useState(true);


  return (
    <>
      {nextScreen ? <Intro nextScreen={nextScreen} setNextScreen={setNextScreen} /> : <WagPay />}
    </>
  );
}
