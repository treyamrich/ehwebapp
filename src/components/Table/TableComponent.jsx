import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import { Table, TableToolbar } from './TableIndex';
import { Pager } from '../Pager/Pager';

const TableContext = createContext();

//This is a wrapper component for the context provider
export const TableComponent = ({data, color, pageSettings, deleteOperation, createOperation, updateOperation,  children}) => {
  const [allSel, setAllSel] = useState(false);
  const [numSel, setNumSel] = useState(0);
  const [records, setRecords] = useState([]);
  const [pkField, setPkField] = useState("");
  const [colComponents, setColComponents] = useState([]);
  const [pages, setPages] = useState([]);
  const [displayPage, setDisplayPage] = useState(1);

  const handleSelAll = () => {
    //Selects all records
    records.forEach(elm => elm.MYuniqSelATTR = !allSel);
    setNumSel(allSel ? 0 : records.length);
  }
  const delRecords = () => {
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
    if(deleteOperation) deleteOperation(toDel);
  }
  const initRecords = async () => {
    let recs = data;

    //Check if the client sets local data or remote data
    if(typeof data === 'function') {
      try {
        recs = await data();
      } catch(e) {
        console.log(e);
      }
    }
    //Verify client's func or passed data is an array
    if(!Array.isArray(recs)) {
      throw "Error: Data format must be an Array of Objects. \
      Data fetch function must be an async function which returns an Array.";
    }
    
    setRecords([...recs]);
  }
  const initPkField = () => {
    //Set the primary key value field
    let colComps = Children.toArray(children);
    setColComponents(colComps);
    for(let i = 0; i < colComps.length; i++) {
      if(colComps[i].props.isPrimaryKey === true) {
        setPkField(colComps[i].props.field);
        break;
      }
    }
  };
  //Splits the record array into a 2D array
  const pageRecords = () => {
    const newPages = [[]];
    let insPageIdx = 0;
    let counter = 0;
    for(let i = 0; i < records.length; i++) {
      if(counter == pageSettings.pageSize) {
        count = 0;
        insPageIdx++;
        //Add new page
        if(i != records.length - 1) newPages.push([]);
      }
        newPages[insPageIdx].push(records[i]);
        counter++;
    }
  };

  useEffect(()=>{
    initPkField();
    initRecords();
  }, []);
  useEffect(()=>{
    setAllSel(records.length === numSel && numSel !== 0);
  }, [numSel]);
  useEffect(()=>{
    pageRecords();
  }, [records]);
  return (
    <TableContext.Provider value={{ allSel, setAllSel, colComponents, numSel, setNumSel, handleSelAll, records, setRecords, delRecords }}>
      <div id="table-component-wrapper" className="border">
        <TableToolbar color={color} />
        <Table>
          {children}
        </Table>
        <Pager color={color}/>
      </div>
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext);