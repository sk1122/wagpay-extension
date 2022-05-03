import { AiFillDollarCircle } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { BadgeButton } from ".";

const Intro = ({ nextScreen, setNextScreen }) => {
    return (
        <>
            <div className="text-white h-[500px] overflow-hidden relative w-[500px] max-w-2xl bg-[#191926] px-4 py-6 ">
                <div className=" w-full flex justify-center  mb-9  ">
                    <h1 className="font-bold text-4xl text-center">WagPay</h1>
                </div>
                <div className="text-center w-full py-11  mb-10">
                    <h2 className="text-3xl py-5 font-bold">Connect a wallet</h2>
                    <div className="opacity-75 mb-8">
                        <p className="">By connecting your wallet,</p>
                        <p>it becomes easier for you to swap any token in fuure</p>
                    </div>
                    <div className="flex justify-center mb-9  ">
                        <BadgeButton icon={<MdPayment />} text="pay" />
                        <BadgeButton icon={<AiFillDollarCircle />} text="Transfer" />
                    </div>
                    <button
                        className="bg-black px-6 py-2 text-lg my-4  "
                        onClick={() => {
                            setNextScreen(false);
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </>
    );
};

export default Intro;
