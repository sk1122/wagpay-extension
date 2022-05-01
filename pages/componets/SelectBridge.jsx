const SelectBridge = () => {
    return (
        <>
            <select className="bg-slate-800 text-sm font-bold p-2 m-auto">
                <option className="" selected value="">Select route or will be selected automatically </option>
                <option value="lime">Lime</option>
                <option value="coconut">Coconut</option>
                <option value="mango">Mango</option>
            </select>
        </>
    )
}

export default SelectBridge;