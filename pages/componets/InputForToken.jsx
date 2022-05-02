import { AiFillCaretDown, AiFillDollarCircle } from "react-icons/ai";
import { MdPayment } from "react-icons/md";
import { useAccountContext } from "../../context";


const InputForToken = () => {
    const { amount, setAmount } = useAccountContext()
    
    return (
        <input type="number" value={amount} onChange={e => setAmount(e.target.value)} className="w-full text-black text-sm focus:outline-none p-2" />
    )
}

export default InputForToken;