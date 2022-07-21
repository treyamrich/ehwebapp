import React, { createContext, useContext, useState, useEffect } from 'react';
import { Table } from './TableIndex';

const TableContext = createContext();

//This is a wrapper component for the context provider
export const TableComponent = ({data, children}) => {
  const [allSel, setAllSel] = useState(false);
  const [numSel, setNumSel] = useState(0);
  const [records, setRecords] = useState([]);

  //Selecting all the checkboxes
  const handleSelAll = () => {
    /*
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].checked = isSelAll;
        if(isSelAll) selBoxes.add(boxes[i]);
    }
    if(!isSelAll) {
        setSelBoxes(new Set());
    }
    //-1 since the 'select all' checkbox is included
    setNumSel(isSelAll ? boxes.length - 1 : 0);*/
    if(allSel) setNumSel(0);
    setAllSel(prevAllSel => !prevAllSel);
  }
  const fetchRecords = async () => {
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
  useEffect(()=>{
    fetchRecords();
  }, []);
  useEffect(()=>{
    setAllSel(records.length === numSel && numSel !== 0);
  }, [numSel]);
  
  return (
    <TableContext.Provider value={{ allSel, setAllSel, numSel, setNumSel, handleSelAll, records, setRecords }}>
        <Table>
        {children}
        </Table>
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext);