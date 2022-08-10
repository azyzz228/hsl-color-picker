const PropertyLine = ({ label, value, max = 100, setValue }) => {
    return (
        <div className="flex flex-row items-center justify-start space-x-8">
            <p className="text-xl text-neutral-800">{label}</p>
            <input type="range" name="" id="" className="w-[200px]" value={value} min={0} max={max} onChange={(e) => setValue(e.target.value)} />
            <input type="number" className="w-16" name={label} id={label} value={value} onChange={(e) => { setValue(e.target.value) }} />

            <i className="fa-solid fa-plus cursor-pointer text-2xl" onClick={(e) => setValue(parseInt(value) + 1)}></i>
            <i className="fa-solid fa-minus cursor-pointer text-2xl" onClick={(e) => setValue(parseInt(value) - 1)}></i>
        </div>
    );
}

export default PropertyLine;