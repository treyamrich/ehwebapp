import React, { useState, useEffect } from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { useTableContext } from './TableComponent';
import { SearchBar } from '../index';

const ToolbarButton = ({title, customFunc, icon}) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
        type="button"
        onClick={() => customFunc()}
        className="relative text-xl p-3 mr-2 hover:bg-light-gray"
        >
        {icon}
        </button>
  </TooltipComponent>
);

const TableToolbar = ({color}) => {
    const { delRecords, addRecord, colComponents, records, setRecords } = useTableContext();
    const [fieldNames, setFieldNames] = useState([]);

  useEffect(()=>{
    //Initialize the field names from the column components' props
    const fnames = [];
    for(let i = 0; i < colComponents.length; i++)
      fnames.push(colComponents[i].props.field);
    setFieldNames(fnames);
  }, [colComponents]);
  return (
    <div className="flex justify-between p-2 mx-1 relative items-center">
        <div className="flex">
          <ToolbarButton title="Delete" icon={<BsTrash/>} customFunc={delRecords}/>
          <ToolbarButton title="Add Record" icon={<BsPlusSquare/>} customFunc={addRecord}/>
        </div>
        <SearchBar 
          color={color} 
          records={records}
          setRecords={setRecords}
          searchFields={fieldNames}/>
    </div>
  )
}

export default TableToolbar