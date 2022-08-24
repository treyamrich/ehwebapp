/*Interface Invariant

GraphicForm Props:
  :onAdd - optional callback function before closing the addForm
  :submitForm - a function to be called on form submission
*/

import React, { useState } from 'react'

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
            <h4 className="text-lg font-semibold mb-3">Color</h4>
            <h4 className="text-lg font-semibold mb-3">Plate Size</h4>
            <div>
                <p>Plates are limited by lines</p>
                <p>Write your message here</p>
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