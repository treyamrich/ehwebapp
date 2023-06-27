import React, {useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listVendors } from '../../../graphql/queries';
import { createVendor } from '../../../graphql/mutations';


import ItemForm from '../inventory/ItemForm';
import VendorForm from './vendorForm'
import { TableComponent, ColumnHeader } from '../../../components/Table/TableIndex';
//import { fetchItems } from '../../../data/APICalls';

import { DashboardPage } from '../';
import { useStateContext } from '../../../contexts/ContextProvider';

import { vendorColumns, DEFAULT_TABLE_PAGE_SETTINGS, AUTH_MODE_COGNITO } from '../../../data/uidata'; 
import { arrToString } from '../../../utility/Strings';
//operation result
function ManageVendor({opRes, setOpRes}) {
  const { currentColor } = useStateContext();
  //const [vendorData, setVendorData] = useState([]);
  const [vendorData, setVendorData] = useState([]);
  
  useEffect(() => {
    fetchVendorData();
}, []);

const fetchVendorData = async () => {
    try {
        const data = await API.graphql({ query: listVendors, authMode: AUTH_MODE_COGNITO });
        setVendorData(data.data.listVendors.items);
    } catch (err) {
        setOpRes({...opRes, failureMsg:"Error: Could not fetch vendor data"});
        console.log(err);
    }
}

  //maybe? wtf is this
//   const fetchVendorData = () => {
//     return fetchItems({listVendors}, 
//         AUTH_MODE_COGNITO, 
//         err=>setOpRes({...opRes, failureMsg:"Error: Could not fetch vendor data"})
//     );
// }

    // async function removeVendors(vendorPks) {

    // }

    // async function setVendorData(){

    // }
    async function createVendors(vendor){
        try{
            await API.graphql({query: createVendor,
                variables: {input: vendor}, 
                authMode: AUTH_MODE_COGNITO
        })
        }
        catch(e){
            opRes.failItems.push(vendor.vendorCode);
            console.log(e);
            return;
        }
        opRes.succItems.push(vendor.vendorCode);
    }

    async function performOp(op, vendors) {
        
        //items will be an array if the operation is import
        opRes.succItems = [];
        opRes.failItems = [];
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";
        
        //Choose an operation
        switch(op) {
            // case "remove": {
            //     await removeVendors(vendors);
            //     succMsg += "removed vendor(s): ";
            //     failMsg += "remove vendor(s): ";
            //     break;
            // }
            // case "edit": {
            //     await editItem(items);
            //     succMsg += "edited: ";
            //     failMsg += "edit: ";
            //     break;
            // }
            case "add": {
                await createVendors(vendors);
                succMsg += "added: ";
                failMsg += "add: ";
                break;
            } 
            default: {}
        }

        //Display operation result
        //Remove msg if no items.
        succMsg = opRes.succItems.length === 0 ? 
            "" : 
            succMsg + arrToString(opRes.succItems);
        
        failMsg = opRes.failItems.length === 0 ?
            "" :
            failMsg + arrToString(opRes.failItems);

        //Regrab the inventory and display result
        setOpRes({...opRes, successMsg: succMsg, failureMsg: failMsg});    
    }
  return (
    <DashboardPage category="Page" title="Manage Vendor">
            <TableComponent 
                data={undefined}
                onAdd={{}}
                onEdit={{}}
                addForm={
                    <VendorForm btnBgColor={currentColor} mode="add" dbOperation={performOp}/>
                }
                // editForm={
                //     <ItemForm btnBgColor={currentColor} mode="edit" dbOperation={performOp}/>
                // }
                color={currentColor}
                pageSettings={DEFAULT_TABLE_PAGE_SETTINGS}
            >
                {vendorColumns.map((colInfo, idx)=> <ColumnHeader key={idx} {...colInfo}/>)}
            </TableComponent>
        </DashboardPage>
  );
}

export default ManageVendor;
