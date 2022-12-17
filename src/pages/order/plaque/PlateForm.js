/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission. It must accept
    an object.
*/

import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { pltSizes, pltColors } from '../../../data/uidata';

import { CardManager, RTE, MyInput, ConfirmPopUp } from '../../../components';
import GraphicForm from '../GraphicForm';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const InitialPlateState = {
    label: "",
    pltSize: "",
    customW: "",
    customH: "",
    pltColor: pltColors[0].label,
    pltGraphics: [],
    pltMsg: undefined //This will be a Draft.js state object
};

const lineLimit = 5;
const lineLenLimit = 65;

const PlateForm = ({ btnBgColor, submitForm, managePopUp, editPlate }) => {
    const [plate, setPlate] = useState(editPlate ? editPlate : InitialPlateState);
    const canSubmit = plate.pltSize !== "" && plate.pltSize !== "Custom" || plate.customW !== "" && plate.customH !== "";

    //RTE state
    const [editorState, setEditorState] = useState(() => editPlate ? editPlate.pltMsg : EditorState.createEmpty(),);
    //Center text on first render. If there is a plate to edit, preserve the alignment.
    const [autoTxtCenter, setAutoTxtCenter] = useState(editPlate == undefined); 

    const { pushPopUp, popPopUp } = managePopUp;

    const handleAddPltGraphic = graphicObj => {
        popPopUp();
        setPlate({...plate, pltGraphics: [graphicObj, ...plate.pltGraphics]});
    };
    const handleSelPltColor = (color) => {
        setPlate({...plate, pltColor: color, name: plate.pltSize + " " + color + " plate"});
    };
    const handleSelPltSize = (size) => {
        setPlate({...plate, pltSize: size, name: size + " " + plate.pltColor + " plate"});
    }
    const confirmPlateMsg = () => {
        managePopUp.pushPopUp(<ConfirmPopUp
          onSubmit={()=>{managePopUp.popPopUp(); handleSubmit()}}
          onCancel={managePopUp.popPopUp}
          themeColor={btnBgColor}
          msg="Before proceeding, please double check your message for any spelling or grammatical errors."
          title="Confirm Plate Verbage"
        />)
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        plate.pltMsg = editorState;
        submitForm(plate);
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
                    defaultValue={editPlate ? [{label: editPlate.pltColor, value: -1}] : [pltColors[0]]}
                    options={pltColors}
                    onChange={option=>handleSelPltColor(option.label)}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Tip:</strong> Dimensions are listed in format: <strong>Length x Width</strong> (L x W) and in the <strong>units of inches.</strong> The default color is black/gold because it usually goes with all plaque colors, although <strong>we recommend you choose the color that matches your other addons.</strong></p>
                </div>
            </div>
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Plate Size</h4>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={pltSizes}
                    defaultValue={editPlate ? [{label: editPlate.pltSize, value: -1}] : null}
                    onChange={option=>handleSelPltSize(option.label)}
                    className="mb-3"
                />
                {plate.pltSize === "Custom" && (
                    <div className="text-center mb-3">
                        <p className="text-sm text-slate-400 mb-2">Please enter the dimensions in inches</p>
                        <div className="flex justify-center h-9">
                            <label className="mr-3 font-semibold" 
                                htmlFor="custom-w">Width:
                            </label>
                            <MyInput 
                                type="number"
                                onChange={(e)=>setPlate({...plate, customW: e.target.value})} 
                                value={plate.customW}
                                id="custom-w"
                                color={btnBgColor}
                            />
                            <label className="mr-3 font-semibold" 
                                htmlFor="custom-h">Height:
                            </label>
                            <MyInput
                                type="number"
                                value={plate.customH}
                                onChange={(e)=>setPlate({...plate, customH: e.target.value})}
                                id="custom-h"
                                color={btnBgColor}
                            />
                        </div>
                    </div>
                )}
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Note:</strong> Plates are limited by the amount lines</p>
                </div>
            </div>
            <div className="p-2">
                <h4 className="text-lg font-semibold mb-1">Plate Graphic(s)</h4>
                <CardManager 
                    options={plate.pltGraphics} 
                    onAddCard={()=>pushPopUp(
                        <GraphicForm title="Add Plate Graphic" 
                            btnBgColor={btnBgColor}
                            submitForm={handleAddPltGraphic}
                        />
                    )}
                />
            </div>
            <div className="py-2 px-1">
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-3">Write your message here!</h4>
                </div>
                <div className="w-full bg-white mb-3 py-3">
                    <RTE stepName="Write your customized message"
                        editorState={editorState}
                        setEditorState={setEditorState}
                        lineLimit={lineLimit}
                        lineLenLimit={lineLenLimit}
                        autoTxtCenter={autoTxtCenter}
                        setAutoTxtCenter={setAutoTxtCenter}
                    />
                </div>
                <p className="text-sm text-slate-400">Note: Plates are limited by the amount of lines</p>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: btnBgColor, opacity: canSubmit ? 1 : 0.3}}
                type="button"
                onClick={confirmPlateMsg}
                disabled={!canSubmit}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default PlateForm