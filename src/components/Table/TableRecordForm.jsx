import React from 'react'

const TableRecordForm = ({colComponents}) => {
  return (
    <div className="flex justify-center text-left">
      <div className="w-11/12 bg-slate-50 rounded-md drop-shadow-xl p-3">
      {colComponents.map((colHeader, idx)=>(
        <div key={`in-${idx}`} className="p-3">
          <label htmlFor={`in-${idx}`}
              className="text-lg"
            >
              {colHeader.props.headerText}
            </label>
          <input name={`in-${idx}`}
            className="border px-3 py-2 w-full"
            placeholder={colHeader.props.headerText}
          />
        </div>
      ))}
      {colComponents.map((colHeader, idx)=>(
        <div key={`in-${idx}`} className="p-3">
          <label htmlFor={`in-${idx}`}
              className="text-lg"
            >
              {colHeader.props.headerText}
            </label>
          <input name={`in-${idx}`}
            className="border px-3 py-2 w-full"
            placeholder={colHeader.props.headerText}
          />
        </div>
      ))}
      </div>
    </div>
  )
}

export default TableRecordForm