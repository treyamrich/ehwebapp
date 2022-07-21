import React, { createContext, useContext, useState } from 'react';

const TableContext = createContext();

export const TableContextProvider = ({ children }) => {
  
    const [allSel, setAllSel] = useState(false);
    const [selBoxes, setSelBoxes] = useState(()=>new Set());
    const [numSel, setNumSel] = useState(0);

    //Selecting a single checkbox
    const handleSel = cbox => {
        if(cbox.checked) {
            selBoxes.add(cbox);
            setNumSel(prevNumSel => prevNumSel + 1);
        }
        else {
            selBoxes.delete(cbox);
            setNumSel(prevNumSel => prevNumSel - 1);
        }
    }
    //Selecting all the checkboxes
    const handleSelAll = isSelAll => {
        const boxes = document.getElementsByClassName("checkbox");
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].checked = isSelAll;
            if(isSelAll) selBoxes.add(boxes[i]);
        }
        if(!isSelAll) {
            setSelBoxes(new Set());
        }
        //Rerenders component
        setNumSel(isSelAll ? boxes.length : 0);
    }

    return (
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        <TableContext.Provider value={{ allSel, setAllSel, numSel, setNumSel, handleSelAll, handleSel }}>
        {children}
        </TableContext.Provider>
    );
};

export const useTableContext = () => useContext(TableContext);