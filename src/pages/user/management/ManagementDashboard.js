import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Sidebar, Navbar } from '../../../components/index';
import { useStateContext } from '../../../contexts/ContextProvider';

import ManageInventory from './inventory/ManageInventory';
import ManagePO from './purchase-order/ManagePO';

//Database operation state
const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};

function ManagementDashboard() {

    const [opRes, setOpRes] = useState(initialOpState);
    const {activeMenu } = useStateContext();

    return(
        <>
            <div className="flex relative dark:bg-main-dark-bg">
                <div className="fixed right-4 bottom-4" style={{zIndex: '1000'}}>
                    <TooltipComponent content="Settings" position="Top">
                        <button type="button" 
                            className="text-2xl p-3 hover:drop-shadow-xl 
                            hover:bg-light-gray text-white"
                            style={{background: 'blue', borderRadius: '50%'}}>
                            <FiSettings/>
                        </button>
                    </TooltipComponent>
                </div>
            </div>
            {activeMenu ? (
                <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
                    <Sidebar/>
                </div>
            ) : (
                <div className="w-0 dark:bg-secondary-dark-bg">
                    <Sidebar/>
                </div>
            )}
            <div
                className={
                activeMenu
                    ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                    : 'bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 '
                }
            >
                <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                    <Navbar />
                </div>
                <div>
                    <Routes>
                        <Route path="/" element={<div><h1>hi</h1><h1>hi</h1></div>}/>
                        <Route path="/purchase-order" element={<ManagePO opRes={opRes} setOpRes={setOpRes}/>}/>
                        <Route path="/inventory" element={<ManageInventory opRes={opRes} setOpRes={setOpRes}/>}/>
                    </Routes>
                </div>
                {/*opRes.failureMsg !== "" ? <h1>{opRes.failureMsg}</h1> : null*/}
                {/*opRes.successMsg !== "" ? <h1>{opRes.successMsg}</h1> : null*/}
            </div>
        </>
    );
}

export default ManagementDashboard;