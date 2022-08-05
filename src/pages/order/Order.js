import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { CgShoppingCart } from 'react-icons/cg';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { Alert, Sidebar, Navbar, Footer, ThemeSettings } from '../../components/index';
import { useStateContext } from '../../contexts/ContextProvider';

import { Bundles, Plaque, Bottle, Gift } from './index';
import { order_links } from '../../data/uidata';

//Database operation state
const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};

const initialOrderState = {
    orderNum: '',
    contactInfo: {
        name: '',
        phone: '',
        email: '',
    },
    dateNeeded: '',
    timeNeeded: '',
    location: '',
    status: 'NEW',
    rushStatus: 'NONE',
    cart: [],
    notes: ''
};


const Order = () => {
    const [order, setOrder] = useState(initialOrderState);
    const [showContact, setShowContact] = useState(true);
    const [opRes, setOpRes] = useState(initialOpState);
    const {activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

    const resetOpRes = () => setOpRes(initialOpState);
  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
          <div className="flex relative dark:bg-main-dark-bg">
            <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
              <TooltipComponent
                content="Cart"
                position="Top"
              >
                <button
                  type="button"
                  onClick={() => setThemeSettings(true)}
                  style={{ background: '#c39f7f57', color: 'black', borderRadius: '50%' }}
                  className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
                >
                  <CgShoppingCart/>
                </button>
  
              </TooltipComponent>
            </div>
            {activeMenu ? (
              <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
                <Sidebar links={order_links}/>
              </div>
            ) : (
              <div className="w-0 dark:bg-secondary-dark-bg">
                <Sidebar links={order_links}/>
              </div>
            )}
            <div
              className={
                activeMenu
                  ? 'dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  '
                  : 'bg-main-bg dark:bg-main-dark-bg w-full min-h-screen flex-2 '
              }
            >
              <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar />
                {opRes.failureMsg !== "" ? <Alert variant="danger" dismissible onClose={resetOpRes}>{opRes.failureMsg}</Alert> : null}
                {opRes.successMsg !== "" ? <Alert variant="success" dismissible onClose={resetOpRes}>{opRes.successMsg}</Alert> : null}
              </div>
              <div>
                {themeSettings && (<ThemeSettings />)}
  
                <Routes>
                    <Route path="/" element={<Bundles/>}/>
                    <Route path="bundles" element={<Bundles/>}/>
                    <Route path="plaques%20&%20plates" element={<Plaque opRes={opRes} setOpRes={setOpRes}/>}/>
                    <Route path="engravable%20bottles" element={<Bottle opRes={opRes} setOpRes={setOpRes}/>}/>
                    <Route path="personalized%20gifts" element={<Gift opRes={opRes} setOpRes={setOpRes}/>}/>
                </Routes>
              </div>
              <Footer />
            </div>
          </div>
      </div>
  )
}

export default Order