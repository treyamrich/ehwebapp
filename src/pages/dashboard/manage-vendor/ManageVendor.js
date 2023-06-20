import React, { useEffect, useState } from 'react';
import { API } from 'aws-amplify';
import { listVendors } from '../../../graphql/queries';
import { TableComponent, ColumnHeader } from '../../../components/Table/TableIndex';

import { DashboardPage } from '../';
import { useStateContext } from '../../../contexts/ContextProvider';

import { inventoryColumns, DEFAULT_TABLE_PAGE_SETTINGS, AUTH_MODE_COGNITO } from '../../../data/uidata'; 

function ManageVendor({ opRes, setOpRes }) {
  const { currentColor } = useStateContext();
  const [vendorData, setVendorData] = useState([]);

  useEffect(() => {
    fetchVendorData();
  }, []);

  //maybe? wtf is this
  async function fetchVendorData() {
    try {
      const response = await API.graphql({ query: listVendors });
      const vendors = response.data.listVendors.items;
      setVendorData(vendors);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <DashboardPage category="Page" title="Manage Vendor">
            <TableComponent 
                data={undefined}
                /*onFetch={fetchInventory}*/
                // onDelete={{callbackOperation: removeItems}}
                onAdd={{}}
                onEdit={{}}
                color={currentColor}
                pageSettings={DEFAULT_TABLE_PAGE_SETTINGS}
            >
                {inventoryColumns.map((colInfo, idx)=> <ColumnHeader key={idx} {...colInfo}/>)}
            </TableComponent>
        </DashboardPage>
  );
}

export default ManageVendor;
