import React, { useState, useEffect } from 'react';
import { listPurchaseOrders } from '../../../../graphql/queries';

function ManagePO() {
    const [openPO, setOpenPO] = useState([]);
    const [closedPO, setClosedPO] = useState([]);

    async function fetchPO() {
        try {
            const openPOData = await API.graphql({query: listPurchaseOrders,
                variables: {
                    filter: {
                        isOpen: {
                            eq: true
                        }
                    }
                }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            const closedPOData = await API.graphql({query: listPurchaseOrders, 
                variables: {
                    filter: {
                        isOpen: {
                            eq: false
                        }
                    }
                }, authMode: 'AMAZON_COGNITO_USER_POOLS'});
            setOpenPO(openPOData.data.listPurchaseOrders.items);
            setClosedPO(closedPOData.data.listPurchaseOrders.items);
        } catch(e) {
            //setOpRes({...opRes, errorMsg:"Error: Could not fetch purchase orders"});
        }
    }
    useEffect(()=>{
        fetchPO();
    }, []);
    return(
        <div className="po-main-wrapper">
            <div>
                <h1>Open</h1>
                <div className="po-item-wrapper">
                    {openPO.map((po, index)=>{
                        <ul key={index}>
                            <li>Vendor: {po.vendorId}</li>
                            <li>Date: {po.date}</li>
                            <li>Number of purchased products: {po.orderedProducts.length}</li>
                        </ul>
                    })}
                </div>
            </div>
            <div>
                <h1>Closed</h1>
                <div className="po-item-wrapper">
                    {openPO.map((po, index)=>{
                        <ul key={index}>
                            <li>Vendor: {po.vendorId}</li>
                            <li>Date: {po.date}</li>
                            <li>Number of purchased products: {po.orderedProducts.length}</li>
                        </ul>
                    })}
                </div>
            </div>
        </div>
    );
}

export default ManagePO;