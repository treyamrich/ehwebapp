import React, { useState, useEffect } from 'react'
import { BsTrash, BsPlusSquare } from 'react-icons/bs';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Navigate } from 'react-router-dom';

import { SearchBar, PopUpForm } from '../index';

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
    const [redirect, setRedirect] = useState("");
    const { onDelete, onAdd, onEdit } = clientInput;

    const handleOnDel = () => {
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
        
        //Call the client's callback function
        if(onDelete) onDelete(toDel);
    }
    //Adds the record
    const handleOnAdd = () => {
        if(!onAdd) return;
        if(onAdd.redirectTo) {
            window.location.replace("purchase orders");
            return;//setRedirect(onAdd.redirectTo);
        }
        setShowForm({add: true, edit: false});
    }
    const handleOnEdit = () => {
        if(!onEdit) return;
        if(onEdit.redirectTo) setRedirect(onAdd.redirectTo);
        setShowForm({add: false, edit: true});
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
    
    if(redirect !== '') return <Navigate to={redirect}/>
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
                icon={<BsPlusSquare/>} 
                customFunc={handleOnEdit}
            />
        </div>
        <SearchBar 
          color={color} 
          records={records}
          setRecords={setRecords}
          searchFields={fieldNames}
        />

        {/*Showing the client's components*/}
        {showForm.add ? 
          <PopUpForm
            closePopUp={()=>setShowForm({add: false, edit: false})}
            submitForm={()=>{}}
            ></PopUpForm> : null}
        {showForm.edit ? 
          <PopUpForm
            closePopUp={()=>setShowForm({add: false, edit: false})}
            submitForm={()=>{}}
          ></PopUpForm> : null}
    </div>
  )
}

export default TableToolbar