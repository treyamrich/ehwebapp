import React from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

const ToolbarButton = ({title, customFunc, icon}) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
        type="button"
        onClick={() => customFunc()}
        className="relative text-xl p-1 mr-2 hover:bg-light-gray"
        >
        {icon}
        </button>
  </TooltipComponent>
);

const TableToolbar = ({addRecord, updateRecord, deleteRecords}) => {
    
  return (
    <div className="table-toolbar-wrapper flex">
        <ToolbarButton title="Delete" icon={<BsTrash/>} customFunc={deleteRecords}/>
        <ToolbarButton title="Add Record" icon={<BsPlusSquare/>} customFunc={addRecord}/>
    </div>
  )
}

export default TableToolbar