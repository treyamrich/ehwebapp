import React, { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom';

import { Alert, Sidebar, Navbar, Footer, PopUp } from '../../components/index';
import { useStateContext } from '../../contexts/ContextProvider';

import { Bundles, Plaque, Bottle, Gift, ContactForm } from '.';
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
    dateNeeded: new Date(),
    timeNeeded: '',
    location: '',
    status: 'NEW',
    rushStatus: 'NONE',
    cart: [],
    notes: ''
};

const EH_COLOR_DARK = '#C39F7F';
const EH_COLOR_LIGHT = '#c39f7f57';

const Order = () => {
  const [order, setOrder] = useState(initialOrderState);
  const [display, setDisplay] = useState('start'); //Control start, contact form, and order screen display
  const [opRes, setOpRes] = useState(initialOpState);
  const [popups, setPopUps] = useState([]); //PopUps are implemented as a stack
  const {activeMenu, currentMode } = useStateContext();

  const resetOpRes = () => setOpRes(initialOpState);
  
  const popPopUp = () => {
    setPopUps(prevPopups=> {
      prevPopups.pop();
      return [...prevPopups];
    });
  }
  const pushPopUp = component => setPopUps(prev => [...prev, component]);

  return (
    <div className={currentMode === 'Dark' ? 'dark' : ''}>
      <div className="flex relative dark:bg-main-dark-bg">
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar themeColor={EH_COLOR_LIGHT} links={order_links}/>
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar themeColor={EH_COLOR_LIGHT} links={order_links}/>
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
          <Navbar themeColor={EH_COLOR_DARK} s
            etDisplay={setDisplay} 
            user={{...order.contactInfo}}
            order={order}
            setOrder={setOrder}
          />
          {opRes.failureMsg !== "" ? <Alert variant="danger" dismissible onClose={resetOpRes}>{opRes.failureMsg}</Alert> : null}
          {opRes.successMsg !== "" ? <Alert variant="success" dismissible onClose={resetOpRes}>{opRes.successMsg}</Alert> : null}
        </div>
        <div>
          {popups.map((childElm, idx)=>(
            <PopUp key={idx}
              closePopUp={popPopUp}
              title={childElm.props.title}
            >
              { childElm }
            </PopUp>
          ))}
          {display === 'start' && (
            <ContactForm order={order} 
            setOrder={setOrder} 
            setDisplay={setDisplay}
          />)}

          <Routes>
              <Route path="/" element={<Bundles/>}/>
              <Route path="bundles" element={<Bundles/>}/>
              <Route path="plaques-and-plates" element={
                <Plaque 
                  managePopUp={{pushPopUp, popPopUp}}
                  opRes={opRes} setOpRes={setOpRes}
                  themeColor={EH_COLOR_DARK}  
                  order={order}
                  setOrder={setOrder}
                />}
              />
              <Route path="engravable-bottles" element={<Bottle opRes={opRes} setOpRes={setOpRes}/>}/>
              <Route path="personalized-gifts" element={<Gift opRes={opRes} setOpRes={setOpRes}/>}/>
          </Routes>
        </div>
        <Footer />
        </div>
      </div>
    </div>
  )
}

export default Order