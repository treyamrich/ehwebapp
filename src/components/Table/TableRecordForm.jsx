import React from 'react'

const TableRecordForm = ({btnBgColor, submitForm}) => {
  const colComponents = [...Array(10)];
  return (
    <div className="flex justify-center text-left flex-col"
      style={{maxHeight: '85vh'}}
    >
      <div className="w-11/12 bg-slate-50 rounded-md drop-shadow-xl p-3 m-auto overflow-y-auto">
      {colComponents.map((colHeader, idx)=>(
        <div key={`in-${idx}`} className="p-3">
          <label htmlFor={`in-${idx}`}
              className="text-lg font-semibold"
            >
              {colHeader}
            </label>
          <input name={`in-${idx}`}
            className="border px-3 py-2 w-full"
            placeholder={colHeader}
          />
        </div>
      ))}
      </div>
      <div id="submit-popup-form" className='flex justify-end items-center p-4 ml-4'>
        <button className="text-white w-full lg:w-1/6 hover:drop-shadow-xl p-3"
          style={{borderRadius: '10px', backgroundColor: btnBgColor}}
          onClick={()=>submitForm()}
        >
          Save
        </button>
      </div>
    </div>
  )
}

export default TableRecordForm