/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission
*/

import React, { useRef, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md';
import { CardSelector, SearchBar } from '../../components';

const initFormControlState = {
    canUpload: true,
    canSelect: true,
    canSubmit: false
};

const GraphicForm = ({ btnBgColor, submitForm }) => {
    const graphicRef = useRef();
    const [selGraphicIdx, setSelGraphicIdx] = useState(-1);
    const [formControl, setFormControl] = useState(initFormControlState);

    const { canSubmit, canSelect, canUpload } = formControl;

    const handleResetFile = () => {
        document.getElementById("nif").value = "";
        setFormControl({...formControl, canSelect: true, canSubmit: false})
    }
    const handleImgSelect = () => {
        handleResetFile();
        //Toggles the disable state of the file input and submit button
        setFormControl({...formControl, canUpload: !canUpload, canSubmit: !canSubmit});
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        submitForm(1);
    }
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-slate-50 rounded-md drop-shadow-xl p-5 m-auto overflow-y-auto">
            <div id="nimg">
                <label className="text-lg font-semibold" htmlFor="item-code">Upload New</label>
                <div className="p-3 flex items-center">
                    <button type="button"
                        onClick={handleResetFile}
                        className="border rounded-sm hover:bg-slate-200 mr-5"    
                    ><MdOutlineClose size={25} color="red"/></button>
                    <input className="border px-3 py-2 w-full rounded-sm" 
                        id="nif"
                        type="file" name="new-graphic"
                        ref={graphicRef}
                        disabled={!canUpload}
                        onChange={()=>setFormControl({...formControl, canSelect: false, canSubmit: true})}
                    />
                </div>
            </div>
            <div id="eimg">
                <h4 className="text-lg font-semibold mb-3">Choose a Graphic</h4>
                <div className="flex justify-end mb-3 px-3">
                    <SearchBar color={btnBgColor}/>
                </div>
                <CardSelector items={[1, 2, 3, 4, 5]} 
                    selectedIdx={selGraphicIdx}
                    setSelectedIdx={setSelGraphicIdx}
                    orientation="vertical"
                    onSelect={handleImgSelect}
                    disabled={!canSelect}
                />
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: canSubmit ? btnBgColor : '#D1D5DB'}}
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default GraphicForm