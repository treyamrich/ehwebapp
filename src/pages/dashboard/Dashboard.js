import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Alert, Sidebar, Navbar, Footer, ThemeSettings } from '../../components/index';
import { useStateContext } from '../../contexts/ContextProvider';

import { Metrics, Inventory, ViewOrder } from './index';
import ManagePO from './purchase-order/ManagePO';
import { dashboard_links } from '../../data/uidata';

//Database operation state
const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};

const Dashboard = () => {

    const [opRes, setOpRes] = useState(initialOpState);
    const {activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();
  
    const resetOpRes = () => setOpRes(initialOpState);
    return(
        <div className={currentMode === 'Dark' ? 'dark' : ''}>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Settings"
                position="Top"
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: currentColor, borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <FiSettings />
                </button>
  
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar themeColor={currentColor} links={dashboard_links}/>
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar themeColor={currentColor} links={dashboard_links}/>
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
                <Navbar user={{name: '', email: '', phone: ''}} themeColor={currentColor} showUserProfile/>
                {opRes.failureMsg !== "" ? <Alert variant="danger" dismissible onClose={resetOpRes}>{opRes.failureMsg}</Alert> : null}
                {opRes.successMsg !== "" ? <Alert variant="success" dismissible onClose={resetOpRes}>{opRes.successMsg}</Alert> : null}
              </div>
              <div>
                {themeSettings && (<ThemeSettings />)}
  
                <Routes>
                    <Route path="/" element={<Metrics/>}/>
                    <Route path="metrics" element={<Metrics/>}/>
                    <Route path="inventory" element={<Inventory opRes={opRes} setOpRes={setOpRes}/>}/>
                    <Route path="purchase-order" element={<ManagePO opRes={opRes} setOpRes={setOpRes}/>}/>
                    <Route path="orders" element={<ViewOrder opRes={opRes} setOpRes={setOpRes}/>}/>
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
      </div>
    );
}

export default Dashboard;