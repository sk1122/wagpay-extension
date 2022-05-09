import DropDown from "./DropDown";
import { IoMdSwap } from "react-icons/io"


const SelectChain = ({ chains }) => {
    return (
        <>
            <div className=" bg-[#232233] px-3 py-3">
                <div className="flex items-center justify-between ">
                    <div className="w-full ">
                        <h2 className="text-bold">Transfer from</h2>
                    </div>
                    <div className="w-full  pl-14">
                        <h2 className="text-bold">Transfer to</h2>
                    </div>

                </div>
                <div className="w-full flex items-center">
                    <DropDown DropDownItems={chains} defaultvalue={chains[0]} />
                    <IoMdSwap className="text-3xl font-bold w-full mx-4 my-4" />
                    <DropDown DropDownItems={chains} defaultvalue={chains[1]} />
                </div>
            </div>

        </>
    )
}

export default SelectChain;