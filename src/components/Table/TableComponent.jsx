import React, { createContext, useContext, useState, useEffect } from 'react';
import { Table } from './TableIndex';

const TableContext = createContext();

//This is a wrapper component for the context provider
export const TableComponent = ({data, children}) => {
  const [allSel, setAllSel] = useState(false);
  const [numSel, setNumSel] = useState(0);
  
  const [records, setRecords] = useState(data);
  
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

  useEffect(()=>{
    setAllSel(records.length === numSel && numSel !== 0);
  }, [numSel]);
  useEffect(()=>{
    setRecords([...data]);
  }, []);

  return (
    <TableContext.Provider value={{ allSel, setAllSel, numSel, setNumSel, handleSelAll, records, setRecords }}>
        <Table>
        {children}
        </Table>
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext);