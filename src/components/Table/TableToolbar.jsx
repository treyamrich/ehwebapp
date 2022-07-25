import React, { useState, useRef } from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { SearchBar, PopUp } from '../index';

const DISABLED_CLASS = "text-gray-300";

const ToolbarButton = ({title, customFunc, icon, disabled}) => (
    <TooltipComponent content={title} position="BottomCenter">
        <button
            type="button"
            onClick={() => customFunc()}
            className={`rounded-md relative text-xl p-3 mr-2 ${disabled ? '' : 'hover:bg-light-gray'}`}
            disabled={disabled}
        >
        {icon}
        </button>
  </TooltipComponent>
);

const initShowFormState = {
    edit: false,
    add: false
};

const TableToolbar = ({color, numSel, records, setRecords, fieldNames, pkField, setNumSel, selectedRecords, clientInput}) => {
    
    const [showForm, setShowForm] = useState(initShowFormState);
    const editObj = useRef(null); //Obj for client edit/add component to use

    const { onDelete, onAdd, onEdit, addForm, editForm } = clientInput;

    //Postcondition: Removes record from the table
    const handleOnDel = () => {

        //Remove from local records array
        let toDel = [];
        let restRecords = [];
        for(let i = 0; i < records.length; i++) {
            if(selectedRecords.current.has(records[i])) {
            toDel.push(records[i][pkField]);
            } else {
                restRecords.push(records[i]);
            }
        }
        setRecords(restRecords);
        setNumSel(0);
        
        //Check if the client wants to preempt or callback
        if(!onDelete) return;
        try {
            onDelete.preemptiveOperation ?
                onDelete.preemptiveOperation() :
                onDelete.callbackOperation(toDel);
        } catch(e) { console.log(e) }
    }
    //Postcondition: Executes the preemptive operation or shows the addForm component
    const handleOnAdd = () => {
        if(!onAdd) return;
        try {
            onAdd.preemptiveOperation ?
              onAdd.preemptiveOperation() :
              setShowForm({add: true, edit: false});
        } catch(e) { console.log(e) }
    }
    //Postcondition: Executes the preemptive operation or shows the editForm component
    const handleOnEdit = () => {
        if(!onEdit) return;
        try {
            if(onEdit.preemptiveOperation)
                onEdit.preemptiveOperation();
            else {
                setShowForm({add: false, edit: true});
                selectedRecords.current.forEach(record =>
                    editObj.current = record
                );
            }
        } catch(e) { console.log(e) }
    }
    //Postcondition: Closes the form component and resets the checkboxes
    const handleClosePopUp = () => {
        setShowForm({add: false, edit: false});
        setNumSel(0);
        selectedRecords.current = new Set();
    }

    //Executed by the addForm component that was provided by the client
    //Postconditon: Adds the record locally to the table component
    const addRecord = (newRecord=null) => {
        handleClosePopUp();
        //Ensure the client passed a record
        if(!newRecord) return;
        //Update table
        setRecords([newRecord, ...records]);
    }
    const editRecord = (editedRecord=null) => {
        handleClosePopUp();
        //Ensure the client passed a record
        if(!editedRecord) return;
        //Update table
        setRecords(records.map(record => 
            record[pkField] !== editObj.current[pkField] ?
            record : editedRecord
        ));

    }
    
  return (
    <div className="flex justify-between p-2 mx-1 relative items-center">
        <div className="flex">
            <ToolbarButton 
                title="Delete" 
                icon={
                <BsTrash 
                    className={numSel < 1 ? DISABLED_CLASS : ''}
                />}
                disabled={numSel < 1}
                customFunc={handleOnDel}
            />
            <ToolbarButton 
                title="Add Record" 
                icon={<BsPlusSquare/>}
                disabled={false} 
                customFunc={handleOnAdd}
            />
            <ToolbarButton 
                title="Edit Record" 
                icon={
                    <AiOutlineEdit 
                        className={numSel !== 1 ? DISABLED_CLASS : ''}
                />}
                disabled={numSel !== 1}
                customFunc={handleOnEdit}
            />
        </div>
        <SearchBar 
          color={color} 
          records={records}
          setRecords={setRecords}
          searchFields={fieldNames}
        />

        {/*Show the client's components*/}
        {showForm.add ? 
          <PopUp
                title="Add View"
                closePopUp={handleClosePopUp}
            >
               {React.cloneElement(addForm, {submitForm: addRecord})}
            </PopUp> : null}
        {showForm.edit ? 
          <PopUp
            title="Edit View"
            closePopUp={handleClosePopUp}
          >
                {React.cloneElement(editForm, {submitForm: editRecord, editObj: editObj.current})}
          </PopUp> : null}
    </div>
  )
}

export default TableToolbar

/*Implementation Invariant

  - The editForm component will simply edit the object it was passed that is in the table
  - The addForm component will also edit the object it was passed, but it also needs to add the record to the table

*/