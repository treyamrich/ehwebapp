/*Interface Invariant

PlateForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission. It must accept
    an object.


Plate .name attribute format as a cartItem: [Custom] {SIZE}" {COLOR} plate 
Ex 1: 5x2" B/G Plate
Ex 2: Custom 10x15" G/B plate
*/

import React, { useState } from 'react';
import { EditorState } from 'draft-js';
import { pltSizes, pltColors, InitCartItemState, EH_COLOR_DARK, animatedComponents } from '../../../data/uidata';

import { CardManager, RTE, MyInput, ConfirmPopUp } from '../../../components';
import GraphicForm from '../GraphicForm';
import { useStateContext } from '../../../contexts/ContextProvider';

import Select from 'react-select';
import { MyTextArea } from '../../../components';

const InitialPlateState = {
    name: "",
    pltSize: "",
    customW: "",
    customH: "",
    pltColor: pltColors[0].label,
    pltGraphics: [],
    notes: ""
};

const lineLimit = 5;
const lineLenLimit = 65;

const PlateForm = ({ submitForm, editPlate }) => {
    //RTE state
    const [editorState, setEditorState] = useState(() => editPlate ? editPlate.txtObj : EditorState.createEmpty(),);
    //Center text on first render. If there is a plate to edit, preserve the alignment.
    const [autoTxtCenter, setAutoTxtCenter] = useState(editPlate === undefined); 
    const { pushPopUp, popPopUp } = useStateContext();

    const [cartItem, setCartItem] = useState(editPlate ? editPlate : {...InitCartItemState});
    const [plate, setPlate] = useState(()=>{
        const newPltObj = {...InitialPlateState};
        if(editPlate) {
           //Parse the plate name for size and color
           let tokens = editPlate.name.split(' ');
           if(tokens[0] === 'Custom') {
            let sizeTokens = tokens[1].split('x');
            newPltObj.customW = sizeTokens[0];
            newPltObj.customH = sizeTokens[1].substring(0, sizeTokens[1].length-1);
            newPltObj.pltSize = tokens[0];
           } else {
            newPltObj.pltSize = tokens[0];
            newPltObj.pltColor = tokens[1];
           }
           newPltObj.notes = cartItem.notes;
           newPltObj.pltGraphics = cartItem.graphics;
           newPltObj.name = cartItem.name;
        }
        return newPltObj;
    });

    const handleAddPltGraphic = graphicObj => {
        popPopUp();
        setPlate({...plate, pltGraphics: [graphicObj, ...plate.pltGraphics]});
    }
    const handleRemovePltGraphic = newGraphicsArr => setPlate({...plate, pltGraphics: [...newGraphicsArr]});

    const confirmPlateMsg = () => {
        pushPopUp(<ConfirmPopUp
          onSubmit={()=>{popPopUp(); handleSubmit()}}
          onCancel={popPopUp}
          themeColor={EH_COLOR_DARK}
          msg="Before proceeding, please double check your message for any spelling or grammatical errors."
          title="Confirm Plate Verbage"
        />)
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        cartItem.txtObj = editorState;
        cartItem.name = plate.pltSize === 'Custom' ? 
            `Custom ${plate.customW}x${plate.customH}" ${plate.pltColor} plate` :
            `${plate.pltSize} ${plate.pltColor} plate`;
        cartItem.graphics = plate.pltGraphics;
        cartItem.notes = plate.notes;
        submitForm(cartItem);
    }
    const canSubmit = (plate.pltSize !== "" && plate.pltSize !== "Custom") || (plate.customW !== "" && plate.customH !== "");
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Color</h4>
                <Select
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={editPlate ? [{label: plate.pltColor, value: -1}] : [pltColors[0]]}
                    options={pltColors}
                    onChange={option=>setPlate({...plate, pltColor: option.label})}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Tip:</strong> Dimensions are listed in format: <strong>Width x Height</strong> (W x H) and in the <strong>units of inches.</strong> The default color is black/gold because it usually goes with all plaque colors, although <strong>we recommend you choose the color that matches your other addons.</strong></p>
                </div>
            </div>
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Plate Size</h4>
                <Select
                    isSearchable={false}
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={pltSizes}
                    defaultValue={editPlate ? [{label: plate.pltSize, value: -1}] : null}
                    onChange={option=>setPlate({...plate, pltSize: option.label})}
                    className="mb-3"
                />
                {plate.pltSize === "Custom" && (
                    <div className="text-center mb-3">
                        <p className="text-sm text-slate-400 mb-2">Please enter the dimensions in inches</p>
                        <div className="flex justify-center">
                            <div className="flex mr-4">
                                <label className="mr-2 font-semibold" 
                                    htmlFor="custom-w">Width:
                                </label>
                                <MyInput 
                                    type="number"
                                    onChange={(e)=>setPlate({...plate, customW: e.target.value})} 
                                    value={plate.customW}
                                    id="custom-w"
                                    color={EH_COLOR_DARK}
                                    style={{width: '75px'}}
                                />
                            </div>
                            <div className="flex">
                                <label className="mr-2 font-semibold" 
                                    htmlFor="custom-h">Height:
                                </label>
                                <MyInput
                                    type="number"
                                    value={plate.customH}
                                    onChange={(e)=>setPlate({...plate, customH: e.target.value})}
                                    id="custom-h"
                                    color={EH_COLOR_DARK}
                                    style={{width: '75px'}}
                                />
                            </div>
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
                            submitForm={handleAddPltGraphic}
                        />
                    )}
                    onDeleteCard={handleRemovePltGraphic}
                />
            </div>
            <div className="p-2">
                <h4 className="text-lg font-semibold mb-1">Additional notes</h4>
                <MyTextArea name="plate-notes"
                    value={plate.notes}
                    onChange={e=>setPlate({...plate, notes: e.target.value})}
                    style={{height:"100px"}}
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400">e.g Put the palm tree graphic at the top right (to the left of the name)</p>
                </div>
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
                        cartItem={cartItem}
                        setCartItem={setCartItem}
                    />
                </div>
                <p className="text-sm text-slate-400">Note: Plates are limited by the amount of lines</p>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: EH_COLOR_DARK, opacity: canSubmit ? 1 : 0.3}}
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