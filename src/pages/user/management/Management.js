import React, { useState, useEffect } from 'react';
import ManageInventory from './inventory/ManageInventory';

function Management({isAdmin}) {

    const [manage, setManage] = useState("");

    if(!isAdmin) return <h1 style={{marginTop: "100px"}}>This page is not available.</h1>;
    
    return(
        <div>
            <div><h1>Insert management navigation bar here later.</h1></div>
            <button type="button" onClick={()=>setManage("inventory")}>Show Inventory Manager</button>
            <button type="button" onClick={()=>setManage("")}>Reset manage state</button>
            {manage === "inventory" && (<ManageInventory isAdmin={isAdmin}/>)}
        </div>
    );
}

export default Management;