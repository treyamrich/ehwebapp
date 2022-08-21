import React, { useState } from 'react'

const GraphicForm = ({ btnBgColor }) => {
    const [graphic, setGraphic] = useState(null);
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-slate-50 rounded-md drop-shadow-xl p-3 m-auto overflow-y-auto">
            <div className="p-3">
                <label className="text-lg font-semibold" htmlFor="item-code">Upload New</label>
                <input className="border px-3 py-2 w-full rounded-sm" 
                    type="file" name="new-graphic" 
                    onChange={(e)=>setGraphic(e.target.value)}
                    value={graphic}
                />
            </div>
            <div className="p-3">
                <h3 className="text-lg font-semibold" htmlFor="item-code">Search</h3>
                <input className="border px-3 py-2 w-full rounded-sm" 
                    type="file" name="new-graphic" 
                    onChange={(e)=>setGraphic(e.target.value)}
                    value={graphic}
                />
            </div>
        </div>
        <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
            <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
                style={{borderRadius: '10px', backgroundColor: btnBgColor}}
                onClick={()=>{}}
            >
                Save
            </button>
        </div>
    </div>
  )
}

export default GraphicForm