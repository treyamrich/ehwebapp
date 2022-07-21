import React from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../../contexts/ContextProvider';

const ToolbarButton = ({title, customFunc, icon, color}) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
        type="button"
        onClick={() => customFunc()}
        style={{ color }}
        className="relative text-xl p-1 mr-2 hover:bg-light-gray"
        >
        {icon}
        </button>
  </TooltipComponent>
);

const TableToolbar = ({addRecord, updateRecord, deleteRecords}) => {
    const { currentColor } = useStateContext();
    
  return (
    <div className="table-toolbar-wrapper flex">
        <ToolbarButton title="Delete" icon={<BsTrash/>} customFunc={deleteRecords} color={currentColor}/>
        <ToolbarButton title="Add Record" icon={<BsPlusSquare/>} customFunc={addRecord} color={currentColor}/>
    </div>
  )
}

export default TableToolbar