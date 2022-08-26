import React, { useRef, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md';
import { CardSelector, SearchBar } from '../../components';

const initFormControlState = {
    canUpload: true,
    canSelect: true,
    canSubmit: false
};

const GraphicForm = ({ btnBgColor, infoContent }) => {
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
  return (
    <div className="flex justify-center text-left flex-col">
        <div className="p-2 m-auto">
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
    </div>
  )
}

export default GraphicForm