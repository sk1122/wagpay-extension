import { useEffect, useState } from "react";
import { AiOutlineUserAdd } from "react-icons/ai";
import { MdArrowDropDown } from "react-icons/md";
const DropDown = ({ DropDownItems, setItem, defaultvalue, isOpen, setIsOpen, chainitem }) => {
    const [itemValue, setItemValue] = useState(defaultvalue)

    useEffect(() => {
        setItem ?
            setItem(defaultvalue) : null
        console.log(chainitem)
    }, [defaultvalue, setItem])
    return (
        <>
            <div className="bg-[#232233]  border border-[#4D4D8D]  px-2 py-2  bg">
                <button className=" relative w-full flex justify-center items-center text-white focus:outline-none shadow group" onClick={(e) => {
                    e.stopPropagation()
                    setIsOpen(!isOpen)
                }}>
                    <div className=" w-full flex items-center justify-center">
                        <AiOutlineUserAdd className="mr-2" />
                        {itemValue ? <p className="" data-value={itemValue}>{itemValue.name}</p> : null}
                        <MdArrowDropDown className="text-2xl font-bold" />
                    </div>
                    {
                        isOpen ? <div className=" absolute top-full min-w-full w-max mt-1 rounded bg-[#202040] z-50" >
                            <ul className="text-left  rounded">
                                {
                                    DropDownItems.map((item) => {
                                        return (<li onClick={(e) => {
                                            console.log("clicked")
                                            setItem(prev => item)
                                            setItemValue(prev => item)
                                            console.log(chainitem)

                                        }} className="px-4 py-1 hover:bg-[#4F54DA] " key={item.value} data-item-name={item.name} data-item-value={item.value}>
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