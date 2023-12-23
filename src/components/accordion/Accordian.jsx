//Target: Single Selection Accordion && Multi-Selection Accordion //

import { useState } from "react";
import data from "./data";

const Accordian = () => {

    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiSelected, setMultiSelected] = useState([]);


    const handleSingleSelection = (getCurrentId) => {
        // console.log(getCurrentId);
        setSelected(getCurrentId === selected ? null : getCurrentId);
    }

    const handleMultiSelection = (getCurrentId) => {
        let cpyMultiple = [...multiSelected];
        const findIndexOfCurrentId = cpyMultiple.indexOf(getCurrentId);
        if(findIndexOfCurrentId === -1) cpyMultiple.push(getCurrentId)
        else cpyMultiple.splice(findIndexOfCurrentId, 1);

        setMultiSelected(cpyMultiple);
    }

    return (
        <div className="py-10">
            <h2 className="text-5xl font-bold text-center underline">Simple Accordion</h2>
            <div className="flex justify-center mt-5">
                <button 
                onClick={
                    () => setEnableMultiSelection(!enableMultiSelection)} 
                    className="px-4 py-2 border rounded-xl border-black hover:bg-red-800 hover:text-white hover:cursor-pointer hover:duration-700 hover:border-white">
                    Enable Multi Selection
                </button>
            </div>
            <div className="flex flex-col items-center py-10">
                <div className="w-[350px] md:w-[400px]">
                    {
                        data && data.length > 0 ?
                            data.map(dataItem => <div key={dataItem.id}>
                                <div className="text-left bg-yellow-600 rounded-lg flex justify-between items-center py-4 px-4 my-2">
                                    <h3 className="text-white font-bold text-xl">{dataItem.question}</h3>
                                    <span onClick={enableMultiSelection 
                                        ? () => handleMultiSelection(dataItem.id) 
                                        : () => handleSingleSelection(dataItem.id)} className="text-white font-bold text-2xl hover:text-black hover:cursor-pointer hover:duration-700">+</span>
                                </div>
                                {
                                    enableMultiSelection ?
                                    multiSelected.indexOf(dataItem.id) !== -1 && 
                                    <div className="mx-2 text-md bg-red-800 text-white mb-2 mt-1 rounded-xl py-4 px-5"><h2>{dataItem.answer}</h2></div> :
                                    selected === dataItem.id && <div className="mx-2 text-md bg-red-800 text-white mb-2 mt-1 rounded-xl py-4 px-5"><h2>{dataItem.answer}</h2></div>
                                }
                            </div>)
                            : <div><h2>Data Not Found</h2></div>
                    }
                </div>
            </div>

        </div>
    );
};

export default Accordian;