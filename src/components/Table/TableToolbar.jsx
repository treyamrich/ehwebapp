import React, { useState, useEffect } from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { AiOutlineEdit } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

import { SearchBar, PopUp } from '../index';

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

const initShowFormState = {
    edit: false,
    add: false
};

const TableToolbar = ({color, records, setRecords, colComponents, setNumSel, clientInput}) => {
    const [fieldNames, setFieldNames] = useState([]);
    const [pkField, setPkField] = useState("");
    const [showForm, setShowForm] = useState(initShowFormState);
    const [recordObj, setRecordObj] = useState(null);

    const { onDelete, onAdd, onEdit, addForm, editForm } = clientInput;

    //Postcondition: Removes record from the table
    const handleOnDel = () => {

        //Remove from local records array
        let toDel = [];
        let restRecords = [];
        for(let i = 0; i < records.length; i++) {
            if(records[i].MYuniqSelATTR) {
            //Remove the custom select attribute and store the primary key
            records[i].MYuniqSelATTR = undefined;
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
            onEdit.preemptiveOperation ?
                onEdit.preemptiveOperation() :
                setShowForm({add: false, edit: true});
        } catch(e) { console.log(e) }
    }
    const handleClosePopUp = () => setShowForm({add: false, edit: false});

    //Executed by the addForm component that was provided by the client
    //Postconditon: Adds the record to the table
    const addRecord = () => {
        handleClosePopUp();

        if(!onAdd) return;
        try {
            onAdd.callbackOperation();
        } catch(e) {console.log(e)};
    }
    //Executed by the editForm component that was provided by the client
    //Postconditon: Edits the record in the table
    const editRecord = () => {
        handleClosePopUp();

        if(!onEdit) return;
        try {
            onEdit.callbackOperation();
        } catch(e) {console.log(e)};
    }

    useEffect(()=>{
        //Init field names from the column components' props and find primary key 
        const fnames = [];
        let field;
        for(let i = 0; i < colComponents.length; i++) {
            field = colComponents[i].props.field;
            if(colComponents[i].isPrimaryKey === true)
                setPkField(field);
            fnames.push(field);
        }
        setFieldNames(fnames);
    }, [colComponents]);
    
  return (
    <div className="flex justify-between p-2 mx-1 relative items-center">
        <div className="flex">
            <ToolbarButton 
                title="Delete" 
                icon={<BsTrash/>} 
                customFunc={handleOnDel}
            />
            <ToolbarButton 
                title="Add Record" 
                icon={<BsPlusSquare/>} 
                customFunc={handleOnAdd}
            />
            <ToolbarButton 
                title="Edit Record" 
                icon={<AiOutlineEdit/>} 
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
                {React.cloneElement(editForm, {submitForm: editRecord})}
          </PopUp> : null}
    </div>
  )
}

export default TableToolbar