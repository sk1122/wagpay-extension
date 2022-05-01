import { AiFillCaretDown, AiFillDollarCircle } from "react-icons/ai";
import { MdPayment } from "react-icons/md";


const SelectToken = () => {
    return (
        <div className="bg-black flex items-center px-6 py-2 text-sm">
            <button>Eth</button>
            <AiFillCaretDown />
        </div>
    )
}

export default SelectToken;