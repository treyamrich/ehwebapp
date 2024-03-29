import React from 'react';
import { DashboardPage } from '..';
import { TableComponent, ColumnHeader } from '../../../components/Table/TableIndex';

import { fetchItems } from '../../../data/APICalls';
import { listOrders } from '../../../graphql/queries';

import { useStateContext } from '../../../contexts/ContextProvider';
import { orderColumns, DEFAULT_TABLE_PAGE_SETTINGS, AUTH_MODE_COGNITO } from '../../../data/uidata';


const ViewOrder = ({ opRes, setOpRes }) => {
    const { currentColor } = useStateContext();

    const fetchOrders = () => {
        return fetchItems({listOrders},
            AUTH_MODE_COGNITO,
            err=>setOpRes({...opRes, failureMsg:"Error: Could not fetch orders"})
        );
    }
  return (
    <DashboardPage category="Page" title="Orders">
        <TableComponent
            onFetch={fetchOrders}
            pageSettings={DEFAULT_TABLE_PAGE_SETTINGS}
            color={currentColor}
        >
            {orderColumns.map((colInfo, idx)=> <ColumnHeader key={idx} {...colInfo}/>)}
        </TableComponent>
    </DashboardPage>
  )
}

export default ViewOrder