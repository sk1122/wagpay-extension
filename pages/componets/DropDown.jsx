import { useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
const DropDown = ({ DropDownItems, setItem, defaultvalue }) => {
    const [IsDropwDownOpen, setIsDropDownOpen] = useState(false)
    return (
        <>
            <div className="bg-[#232233]  border border-[#4D4D8D]  px-2 py-2  bg">
                <button className=" relative w-full flex justify-center items-center text-white focus:outline-none shadow group" onClick={() => {
                    setIsDropDownOpen(!IsDropwDownOpen)
                }}>
                    <div className=" w-full flex items-center justify-center">
                        <AiOutlineUserAdd className="mr-2" />
                        <p className="" data-value={defaultvalue}>{defaultvalue.name}</p>
                        <MdArrowDropDown className="text-2xl font-bold" />
                    </div>
                    {
                        IsDropwDownOpen ? <div className=" absolute top-full min-w-full w-max mt-1 rounded bg-[#202040] z-50" >
                            <ul className="text-left  rounded">
                                {
                                    DropDownItems.map((item) => {
                                        return (<li onClick={(e) => {
                                        }} className="px-4 py-1 hover:bg-[#4F54DA] " key={item.value} data-item-value={item.value}>
                                            {item.name}
                                        </li>)
                                    })
                                }
                            </ul>
                        </div> : null
                    }

                </button>
            </div >
        </>
    )
}

export default DropDown;