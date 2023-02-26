import React from 'react';
import { API } from 'aws-amplify';
import { listItems } from '../../../graphql/queries';
import { createItems, deleteItems, updateItems } from '../../../graphql/mutations';
import { TableComponent, ColumnHeader } from '../../../components/Table/TableIndex';

import { DashboardPage } from '../';
import ItemForm from './ItemForm';
import { arrToString } from '../../../utility/Strings';
import '../../../styles/inventory.css';

import { useStateContext } from '../../../contexts/ContextProvider';
import { inventoryColumns, DEFAULT_TABLE_PAGE_SETTINGS } from '../../../data/uidata'; 
import { fetchItems } from '../../../data/APICalls';

const AUTH_MODE_COGNITO = "AMAZON_COGNITO_USER_POOLS";

function ManageInventory({opRes, setOpRes}) {

    const { currentColor } = useStateContext();

    async function removeItems(itemPks) {
        //Removes the items that are in the selBoxes set and unchecks the boxes
        var promises = [];
        
        itemPks.forEach(pk =>{
            //Get item code from inventory arr and uncheck the checkboxes
            let respPromise = API.graphql({ 
                    query: deleteItems, 
                    variables: { 
                        input: { 
                            code: pk
                        }
                    },
                    authMode: AUTH_MODE_COGNITO
            }).catch((e)=> { 
                opRes.failItems.push(pk); 
                console.log(e);
                return true;
            }).then(err => {if(err !== true) opRes.succItems.push(err.data.deleteItems.code)});
            promises.push(respPromise);
        });
        //Wait for all of the requests to finish
        await Promise.all(promises);
    }
    async function editItem(item) {
        item.createdAt = undefined; //REMOVE THIS LATER AND USE AN OPTIMIZED GRAPHQL QUERY
        item.updatedAt = undefined;
        try {
            await API.graphql({ query: updateItems, 
                variables: {input: item}, 
                authMode: AUTH_MODE_COGNITO
            });
        }
        catch (e) {
            opRes.failItems.push(item.code);
            console.log(e);
            return;
        }
        opRes.succItems.push(item.code);
    }
    async function addItem(item) {
        //Adds a SINGLE item to the database
        try {
            await API.graphql({ query: createItems, 
                variables: {input: item}, 
                authMode: AUTH_MODE_COGNITO
            });
        } catch(e) {
            opRes.failItems.push(item.code);
            console.log(e);
            return;
        }
        opRes.succItems.push(item.code);
    }
    const fetchInventory = () => {
        return fetchItems({listItems}, 
            AUTH_MODE_COGNITO, 
            err=>setOpRes({...opRes, errorMsg:"Error: Could not fetch inventory"})
        );
    }

    async function performOp(op, items) {
        
        //items will be an array if the operation is import
        opRes.succItems = [];
        opRes.failItems = [];
        var succMsg = "Successfully ";
        var failMsg = "Failed to ";
        
        //Choose an operation
        switch(op) {
            case "remove": {
                await removeItems();
                succMsg += "removed item(s): ";
                failMsg += "remove item(s): ";
                break;
            }
            case "edit": {
                await editItem(items);
                succMsg += "edited: ";
                failMsg += "edit: ";
                break;
            }
            case "add": {
                await addItem(items);
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
        <DashboardPage category="Page" title="Inventory">
            <TableComponent 
                data={undefined}
                onFetch={fetchInventory}
                onDelete={{callbackOperation: removeItems}}
                onAdd={{}}
                onEdit={{}}
                addForm={
                    <ItemForm btnBgColor={currentColor} mode="add" dbOperation={performOp}/>
                }
                editForm={
                    <ItemForm btnBgColor={currentColor} mode="edit" dbOperation={performOp}/>
                }
                color={currentColor}
                pageSettings={DEFAULT_TABLE_PAGE_SETTINGS}
            >
                {inventoryColumns.map((colInfo, idx)=> <ColumnHeader key={idx} {...colInfo}/>)}
            </TableComponent>
        </DashboardPage>
    );
}

export default ManageInventory;