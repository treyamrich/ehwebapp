import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import { Table } from './TableIndex';

const TableContext = createContext();

//This is a wrapper component for the context provider
export const TableComponent = ({data, deleteOperation, createOperation, updateOperation,  children}) => {
  const [allSel, setAllSel] = useState(false);
  const [numSel, setNumSel] = useState(0);
  const [records, setRecords] = useState([]);
  const [pkField, setPkField] = useState("");
  const [colComponents, setColComponents] = useState([]);

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
  useEffect(()=>{
    initPkField();
    initRecords();
  }, []);
  useEffect(()=>{
    setAllSel(records.length === numSel && numSel !== 0);
  }, [numSel]);
  
  return (
    <TableContext.Provider value={{ allSel, setAllSel, colComponents, numSel, setNumSel, handleSelAll, records, setRecords, delRecords }}>
        <Table>
        {children}
        </Table>
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext);