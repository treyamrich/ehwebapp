import React from 'react'
import { TableContextProvider } from './contexts/TableContext';
import { Table } from './TableIndex';

//This is a wrapper component for the context provider
const TableComponent = ({data, children}) => {
  return (
    <TableContextProvider>
        <Table data={data}>
        {children}
        </Table>
    </TableContextProvider>
  )
}

export default TableComponent