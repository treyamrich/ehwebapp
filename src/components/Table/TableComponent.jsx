import React, { createContext, useContext, useState, useEffect, Children } from 'react';
import { Table, TableToolbar } from './TableIndex';
import { Pager } from '../Pager/Pager';

const TableContext = createContext();

const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_MAX_PAGE_DISPLAY = 8;

//This is a wrapper component for the context provider
export const TableComponent = ({data, color, pageSettings, deleteOperation, createOperation, updateOperation,  children}) => {
  const [allSel, setAllSel] = useState(false);
  const [numSel, setNumSel] = useState(0);

  const [pkField, setPkField] = useState("");
  const [colComponents, setColComponents] = useState([]);

  const [records, setRecords] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {pageSize, maxPageDisplay} = pageSettings;

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
  const pageRecords = (pgSize) => {
    const newPages = [[]];
    let insPageIdx = 0;
    let count = 0;
    for(let i = 0; i < records.length; i++) {
      //Add new page - if necessary - before inserting
      if(count == pgSize) {
        count = 0;
        insPageIdx++;
        newPages.push([]);
      }
        newPages[insPageIdx].push(records[i]);
        count++;
    }
    setPages(newPages);
  };

  useEffect(()=>{
    initPkField();
    initRecords();
  }, []);
  useEffect(()=>{
    setAllSel(records.length === numSel && numSel !== 0);
  }, [numSel]);
  useEffect(()=>{
    pageRecords(pageSize ? pageSize : DEFAULT_PAGE_SIZE);
  }, [records]);
  return (
    <TableContext.Provider value={{ allSel, setAllSel, colComponents, numSel, setNumSel, handleSelAll, records, setRecords, delRecords }}>
      <div id="table-component-wrapper" className="border">
        <TableToolbar color={color} />
        <Table>
          {children}
        </Table>
        <Pager 
          color={color} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          maxPageDisplay={maxPageDisplay ? maxPageDisplay : DEFAULT_MAX_PAGE_DISPLAY}
          numPages={pages.length}
          numRecords={records.length}
        />
      </div>
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext);