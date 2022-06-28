import React, { useState, useEffect } from 'react';
import ManageInventory from './inventory/ManageInventory';

//Database operation state
const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};

function Management({isAdmin}) {

    const [opRes, setOpRes] = useState(initialOpState);
    const [manage, setManage] = useState("");

    if(!isAdmin) return <h1 style={{marginTop: "100px"}}>This page is not available.</h1>;
    
    return(
        <div>
            <div><h1>Insert management navigation bar here later.</h1></div>
            {opRes.failItems.length !== 0 ? <h1>{opRes.failureMsg}</h1> : null}
            {opRes.succItems.length !== 0 ? <h1>{opRes.successMsg}</h1> : null}
            <button type="button" onClick={()=>setManage("inventory")}>Show Inventory Manager</button>
            <button type="button" onClick={()=>setManage("")}>Reset manage state</button>
            {manage === "inventory" ? <ManageInventory opRes={opRes} setOpRes={setOpRes}/> : null}
        </div>
    );
}

export default Management;