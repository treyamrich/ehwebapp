/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission. It must accept
    an object.
*/

import React, { useState } from 'react';
import { pltSizes, pltColors } from '../../../data/uidata';

import { CardManager } from '../../../components';
import GraphicForm from '../GraphicForm';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const animatedComponents = makeAnimated();

const PlateForm = ({ btnBgColor, submitForm, managePopUp }) => {
    const [selGraphicIdx, setSelGraphicIdx] = useState(-1);
    const [canSubmit, setCanSubmit] = useState(false);

    const { pushPopUp, popPopUp } = managePopUp;

    const handlePlateSelect = () => {
        //Toggles the disable state of the file input and submit button
        setCanSubmit(true);
    }
    //Postcondition: Calls the onAdd (with the selected index) and submitForm callback funcs
    const handleSubmit = () => {
        submitForm({cardName: "B/G 5x2", cardImg: ""});
    }
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-slate-50 rounded-md drop-shadow-xl p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <h4 className="text-lg font-semibold mb-1">Color</h4>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    defaultValue={[pltColors[0]]}
                    options={pltColors}
                    onChange={()=>{}}
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
                    onChange={()=>setCanSubmit(true)}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400"><strong>Note:</strong> Plates are limited by the amount lines</p>
                </div>
            </div>
            <div className="p-2">
                <h4 className="text-lg font-semibold mb-1">Plate Graphic(s)</h4>
                <CardManager 
                    options={[1, 2]} 
                    setOptions={()=>{}}
                    onAddCard={()=>pushPopUp(
                        <GraphicForm title="Add Plate Graphic" 
                            btnBgColor={btnBgColor}
                            submitForm={popPopUp}
                        />
                    )}
                />
            </div>
            <div className="py-2 px-1">
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-3">Write your message here! ADD verify message if the user doesn't put any text.</h4>
                </div>
                <div className="w-full h-96 bg-white mb-3">

                </div>
                <p className="text-sm text-slate-400">Note: Plates are limited by the amount of lines</p>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
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

export default PlateForm