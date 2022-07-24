import React, { createContext, useContext, useState, useEffect, useRef, Children } from 'react';
import { Table, TableToolbar } from './TableIndex';
import { Pager } from '../index';

const TableContext = createContext();

const DEFAULT_PAGE_SIZE = 12;
const DEFAULT_PAGE_COUNT = 8;

/*Interface Invariant

Table Props:
  :color - string
  :pageSettings - object {pageSize: int, pageCount: int}
  :onFetch - asyncFunction 
  :onDelete, onAdd and onEdit - object {preemptiveOperation: function, callbackOperation: async function}
    *preemptiveOperation - a function that is called when the table button is hit.
        No other operations are performed after this.
    *callbackOperation - a function that is called after the TableForm is submitted.
  :addForm - a component that will be rendered if no preemptiveOperation is specififed and the user hits the 'Add' button.
      - The addForm component should call submitForm(recordObject) received from props, and pass it the new record object.
  :editForm - a component that will be rendered if no preemptiveOperation is specififed and the user hits the 'Edit' button.
      - The editForm component should call submitForm() with no arguments,
          AND accept an editObj as props to modify.
*/

export const TableComponent = ({data, color, pageSettings, onDelete, onAdd, onEdit, onFetch, addForm, editForm, children}) => {
  const [allSel, setAllSel] = useState(false);
  const [numSel, setNumSel] = useState(0);
  const selectedRecords = useRef(new Set());

  const fieldNames = useRef([]);
  const pkField = useRef('');
  const colComponents = useRef([]);

  const [records, setRecords] = useState([]);
  const [pages, setPages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const {pageSize, pageCount} = pageSettings;

  //Postcondition: Selected records array contains all the records
  //Selected records array is set to an empty set
  const handleSelAll = () => { 
    allSel ? selectedRecords.current = new Set() :
      records.forEach(rec => selectedRecords.current.add(rec));
    setNumSel(allSel ? 0 : records.length);
  }
  
  //Postcondition: Sets the records state array to the local array
  //Sets the records state to the array received from client's fetchOperation
  const getRecords = async () => {
    let recs = data;

    //Check if the client sets local data or remote data
    if(onFetch) {
      try {
        recs = await onFetch();
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

  //Postcondition: Splits the records state array into pages (2D array)
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
    setCurrentPage(1);
  };

  const onFirstRender = () => {
    const colComps = Children.toArray(children);
    const fnames = []; //Field names
    let field;
    
    for(let i = 0; i < colComps.length; i++) {
        field = colComps[i].props.field;
        //Set the primary key
        if(colComps[i].isPrimaryKey === true)
            pkField.current = field;
        fnames.push(field);
    }
    colComponents.current = colComps;
    fieldNames.current = fnames;
    getRecords();
  }
  useEffect(()=>{
    onFirstRender();
  }, []);
  useEffect(()=>{
    setAllSel(records.length === numSel && numSel !== 0);
  }, [numSel]);
  useEffect(()=>{
    pageRecords(pageSize ? pageSize : DEFAULT_PAGE_SIZE);
  }, [records]);
  
  return (
    <TableContext.Provider value={{ allSel, setAllSel, colComponents, selectedRecords, setNumSel, handleSelAll }}>
      <div id="table-component-wrapper" className="border">

        {/*Table Components*/}
        <TableToolbar 
          color={color}
          numSel={numSel}
          records={records}
          setRecords={setRecords}
          clientInput={{onDelete, onAdd, onEdit, addForm, editForm}}
          setNumSel={setNumSel}
          pkField={pkField.current}
          fieldNames={fieldNames.current}
          selectedRecords={selectedRecords}
        />
        <Table records={currentPage <= pages.length ? pages[currentPage-1] : []}
          colComponents={colComponents.current}
        >
          {children}
        </Table>

        {/*Page Controller*/}
        <Pager 
          color={color} 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pageCount={pageCount ? pageCount : DEFAULT_PAGE_COUNT}
          numPages={pages.length}
          numRecords={records.length}
        />
      </div>
    </TableContext.Provider>
  )
}

export const useTableContext = () => useContext(TableContext);

/*Implementation Invariant:
  This is the main component. It performs paging and manages the state that is
  shared amongst other sub components.

  Sub-Components:
  - ColumnHeader (in children props) - configures format, primary key, and field names for the table.
  - TableToolbar - edits records array using the search bar, performs table CRUD operations
  - Table - renders the table and tracks selected records
  - Pager - controller that sets the page to be viewed

  State Variables:
  - colComponents is an array of ColumnHeader components, it is stored to reduce
      the conversion on every render for the TableToolbar sub-component
  
  - records is an array of objects that is managed by the TableToolbar

  - pages is an array of arrays which stores the records, it is controlled by
      the Pager sub-component but the paging operation occurs in this component

  - currentPage is the page number state and is controlled by the Pager sub-component
  
  - numSel is used to rerender the component when a checkbox is clicked. This is handled
      by the Table sub-component
*/