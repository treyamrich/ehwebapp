import React from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useTableContext } from './TableComponent';
import { useStateContext } from '../../contexts/ContextProvider';
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

const TableToolbar = () => {
    const { delRecords, addRecord } = useTableContext();
    const { currentColor } = useStateContext();
  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative items-center">
        <div className="flex">
          <ToolbarButton title="Delete" icon={<BsTrash/>} customFunc={delRecords}/>
          <ToolbarButton title="Add Record" icon={<BsPlusSquare/>} customFunc={addRecord}/>
        </div>
        <SearchBar color={currentColor}/>
    </div>
  )
}

export default TableToolbar