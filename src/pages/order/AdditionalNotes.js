import React, { useState } from 'react'
import { MyTextArea } from '../../components'
import { EH_COLOR_DARK } from '../../data/uidata'

const AdditionalNotes = ({ cartItem, onSubmit }) => {
    //Must use a separate state for notes because this component is wrapped in a popup
    //So, the popup won't rerender if the state was passed via props
    const [notes, setNotes] = useState(cartItem.notes);
    const handleSubmit = () => {
        onSubmit();
    }
    const updateNotes = newNotes => {
        setNotes(newNotes);
        cartItem.notes = newNotes;
    }
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
        <div className="w-11/12 bg-gray-50 rounded-md drop-shadow-xl p-3 sm:p-5 m-auto overflow-y-auto">
            <div className="py-2 px-1">
                <div className="mb-2 text-center">
                    <h4 className="text-lg font-semibold mb-1">Write your notes here...</h4>
                    <MyTextArea
                        value={notes}
                        onChange={e=>updateNotes(e.target.value)}
                        style={{height:"100px"}}
                    />
                </div>
                <div className="text-center">
                    <p className="text-sm text-slate-400">e.g Please mount the coin at the top right with the plane side up.</p>
                </div>
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 lg:ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: EH_COLOR_DARK}}
                type="button"
                onClick={handleSubmit}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default AdditionalNotes