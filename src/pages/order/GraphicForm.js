/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission
*/

import React, { useRef, useState } from 'react'
import { MdOutlineClose } from 'react-icons/md';
import { CardSelector, SearchBar } from '../../components';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import { graphicColOpts } from '../../data/uidata';

const animatedComponents = makeAnimated();

const initFormControlState = {
    canUpload: true,
    canSelect: true,
    canSubmit: false
};

const DEFAULT_COLOR = "Default - Same as other addons";
const TEST_GRAPHICS = [{name: "LTC", link: 'asdf'}, {name: "ABC", link: 'asdf'}, {name: "gen", link: 'asdf'}, {name: "ki", link: 'asdf'}];//DELETE THIS LATER

const GraphicForm = ({ btnBgColor, submitForm }) => {
    const graphicRef = useRef();
    const [selGraphic, setSelGraphic] = useState(null);
    const [graphicColor, setGraphicColor ] = useState(DEFAULT_COLOR); 
    const [formControl, setFormControl] = useState(initFormControlState);
    const [graphicSelection, setGraphicSelection] = useState(TEST_GRAPHICS);

    const { canSubmit, canSelect, canUpload } = formControl;

    const handleResetFile = () => {
        document.getElementById("nif").value = "";
        setFormControl({...formControl, canSelect: true, canSubmit: false})
    }
    const handleImgSelect = () => {
        handleResetFile();
        //Toggles the disable state of the file input and submit button
        setFormControl({...formControl, canUpload: false, canSubmit: true});
    }
    const handleImgReselect = () => {
        setFormControl({...formControl, canUpload: true, canSubmit: false})
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        submitForm({color: graphicColor, name: `${graphicColor !== DEFAULT_COLOR ? graphicColor : 'Default Color'} - ${selGraphic.name}`});
    }
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Color</h4>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={[graphicColOpts[0]]}
                    options={graphicColOpts}
                    onChange={option => setGraphicColor(option.label)}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Tip:</strong> The default "color" is the same colorfill chosen for your engraved message. If you would like your graphic to be a different color, please specify here.</p>
                </div>
            </div>
            <div className="py-2 px-1">
                <label className="text-lg font-semibold" htmlFor="item-code">Upload New</label>
                <div className="p-3 flex items-center">
                    <button type="button"
                        disabled={!canUpload}
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
            <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>IMPORTANT:</strong> If your graphic is going to be very <strong>small</strong> (anything smaller than 1.5x1.5"), please make sure the image isn't too complex. Small graphics with high detail don't engrave well. If you are uploading a graphic, make sure it's <strong>black/white clip art</strong> (high quality). Feel free to ask us if you have any questions!</p>
                </div>
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-3">Choose a Graphic</h4>
                <CardSelector color={btnBgColor}
                    items={graphicSelection}
                    setItems={setGraphicSelection} 
                    selectedCard={selGraphic}
                    setSelectedCard={setSelGraphic}
                    orientation="vertical"
                    onSelect={handleImgSelect}
                    onReselect={handleImgReselect}
                    disabled={!canSelect}
                    isCardDisabled={()=>false}

                />
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 lg:ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: btnBgColor, opacity: canSubmit ? 1 : 0.3}}
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