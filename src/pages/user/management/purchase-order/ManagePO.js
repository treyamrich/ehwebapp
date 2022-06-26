import React, { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import { listPurchaseOrders } from '../../../../graphql/queries';

const initDisplay = {
    mode: "view-po",
    po: null
};

function ManagePO() {
    const [openPO, setOpenPO] = useState([]);
    const [closedPO, setClosedPO] = useState([]);
    const [display, setDisplay] = useState(initDisplay);

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
            alert(e);
            //setOpRes({...opRes, errorMsg:"Error: Could not fetch purchase orders"});
        }
    }
    useEffect(()=>{
        if(display === "view-po")
            fetchPO();
    }, [display]);

    return(
        <div className="po-main-wrapper">
            {display.mode === "view-po" && (
            <div>
                <div>
                    <h1>Open</h1>
                    <div className="po-item-wrapper">
                        {openPO.map((po, index)=> (
                            <ul key={index} onClick={()=>setDisplay({mode: "edit-po", po: po})}>
                                <li>Vendor: {po.vendorId}</li>
                                <li>Date: {po.date}</li>
                                <li>Number of purchased products: {po.orderedProducts.length}</li>
                            </ul>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Closed</h1>
                    <div className="po-item-wrapper">
                        {closedPO.map((po, index)=> (
                            <ul key={index} onClick={()=>setDisplay({mode: "edit-po", po: po})}>
                                <li>Vendor: {po.vendorId}</li>
                                <li>Date: {po.date}</li>
                                <li>Number of purchased products: {po.orderedProducts.length}</li>
                            </ul>
                        ))}
                    </div>
                </div>
            </div>
            )}
            {display.mode === "edit-po" ? <h2>Edit</h2> : null}
        </div>
    );
}

export default ManagePO;