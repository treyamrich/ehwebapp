/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission
*/

import React, { useState } from 'react';
import { plateColors, plateSizes } from '../../../data/uidata';

import { CardManager } from '../../../components';
import GraphicForm from '../GraphicForm';

import Select from 'react-select';
import makeAnimated from 'react-select/animated';
const animatedComponents = makeAnimated();

const PlateForm = ({ btnBgColor, submitForm }) => {
    const [selGraphicIdx, setSelGraphicIdx] = useState(-1);
    const [canSubmit, setCanSubmit] = useState(true);

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
            <div className="p-2">
                <h4 className="text-lg font-semibold mb-1">Color</h4>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={plateColors}
                    onChange={()=>{}}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400">Tip: Dimensions are listed in format: Length x Width (L x W) and in the units of inches</p>
                </div>
            </div>
            <div className="p-2">
                <h4 className="text-lg font-semibold mb-1">Plate Size</h4>
                <Select
                    closeMenuOnSelect={true}
                    components={animatedComponents}
                    options={plateSizes}
                    onChange={()=>{}}
                    className="mb-3"
                />
                <div className="text-center">
                    <p className="text-sm text-slate-400">Note: Plates are limited by the amount lines</p>
                </div>
            </div>
            <div className="p-2">
                <h4 className="text-lg font-semibold mb-1">Plate Graphic(s)</h4>
                <CardManager 
                    options={[1, 2]} 
                    setOptions={()=>{}}
                    title="Add Plate Graphic(s)"
                    addForm={<GraphicForm btnBgColor={btnBgColor}/>}
                />
            </div>
            <div className="p-2">
                <div className="text-center">
                    <h4 className="text-lg font-semibold mb-3">Write your message here!</h4>
                </div>
                <div className="w-full h-96 bg-white mb-3">

                </div>
                <p className="text-sm text-slate-400">Note: Plates are limited by the amount of lines</p>
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

export default PlateForm