import React, { createContext, useContext, useState } from 'react';
import { initialOrderState } from '../data/uidata';

const StateContext = createContext();

const initialClickState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

//Database operation state
const initialOpState = {
  successMsg: "",
  failureMsg: "",
  succItems: [], 
  failItems: [] 
};

export const ContextProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(undefined);
  const [currentColor, setCurrentColor] = useState('#C39F7F');
  const [currentMode, setCurrentMode] = useState('Light');
  const [themeSettings, setThemeSettings] = useState(false);
  const [activeMenu, setActiveMenu] = useState(true);
  const [isClicked, setIsClicked] = useState(initialClickState);

  const [dynamodbObj, setDynamodbObj] = useState(null); //For database transactions

  const [opRes, setOpRes] = useState(initialOpState);
  const [order, setOrder] = useState(initialOrderState);
  const [popups, setPopUps] = useState([]); //PopUps are implemented as a stack

  const setMode = (e) => {
    setCurrentMode(e.target.value);
    localStorage.setItem('themeMode', e.target.value);
    setThemeSettings(false);
  };

  const setColor = (color) => {
    setCurrentColor(color);
    localStorage.setItem('colorMode', color);
    setThemeSettings(false);
  };

  const handleClick = (clicked) => setIsClicked({ ...initialClickState, [clicked]: true });

  const popPopUp = () => {
    setPopUps(prevPopups=> {
      prevPopups.pop();
      return [...prevPopups];
    });
    document.documentElement.style.overflow = "scroll";
  }
  const pushPopUp = component => {
    setPopUps(prev => [...prev, component]);
    document.documentElement.style.overflow = "hidden";
  }

  const resetOpResState = () => setOpRes({...initialOpState});

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider value={{ currentColor, currentMode, activeMenu, screenSize, setScreenSize, handleClick, isClicked, initialClickState, setIsClicked, setActiveMenu, setCurrentColor, setCurrentMode, setMode, setColor, themeSettings, setThemeSettings, popups, popPopUp, pushPopUp, order, setOrder, opRes, setOpRes, resetOpResState, dynamodbObj, setDynamodbObj }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);