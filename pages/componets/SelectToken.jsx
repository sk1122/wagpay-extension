import { InputForToken } from "."
import DropDown from "./DropDown"

const SelectToken = ({ tokens }) => {
    return (
        <>
            <div className="bg-[#232233] px-3 py-3 my-3">
                <h2 className="text-lg font-bold">Send</h2>
                <div className="flex justify-around items-center my-3">
                    <div className="w-[40%]">
                        <InputForToken />
                    </div>
                    <div className="w-[40%]">
                        <DropDown DropDownItems={tokens} defaultvalue={tokens[0]} />
                    </div>
                </div>
                <h2 className="text-lg font-bold">You receive</h2>
                <div className="flex justify-around items-center my-3">
                    <div className="w-[40%]">
                        <InputForToken />
                    </div>
                    <div className="w-[40%]">
                        <DropDown DropDownItems={tokens} defaultvalue={tokens[1]} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SelectToken;