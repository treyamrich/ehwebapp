import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { EditorState } from 'draft-js';
import { Alert, Sidebar, Navbar, Footer, PopUp } from '../../components';
import { useStateContext } from '../../contexts/ContextProvider';
import { Bundles, Plaque, Bottle, Gift, ContactForm } from '.';
import { order_links, EH_COLOR_DARK, EH_COLOR_LIGHT, InitCartItemState } from '../../data/uidata';

//Database operation state
const initialOpState = {
    successMsg: "",
    failureMsg: "",
    succItems: [], 
    failItems: [] 
};

const Order = () => {
  const [display, setDisplay] = useState('start'); //Control start, contact form, and order screen display
  const [opRes, setOpRes] = useState(initialOpState);
  //On first render, instruct the RTE to center the text
  const [autoTxtCenter, setAutoTxtCenter] = useState(true);
  const [cartItem, setCartItem] = useState({...InitCartItemState});
  const [selItem, setSelItem] = useState(null);
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty(),);
  const [editItemIdx, setEditItemIdx] = useState(-1); //-1 means no item is being edited
  const { activeMenu, currentMode, popups, popPopUp, order, setOrder, handleClick, setIsClicked, initialClickState } = useStateContext();

  //Resets the entire customization process
  const resetState = () => {
    setCartItem({...InitCartItemState});
    setSelItem(null);
    setEditorState(EditorState.createEmpty());
    setAutoTxtCenter(true);
    setEditItemIdx(-1);
  }
  //itemIdx is the index in the cart
  const handleEditCartItem = (item, itemIdx) => {
    setSelItem({
      name: item.name,
      code: item.code,
      category: item.category,
      price: item.price
    });
    setEditorState(item.txtObj);
    setCartItem(item);
    setAutoTxtCenter(false); //Preserve editor state's centering
    setIsClicked(initialClickState);
    setEditItemIdx(itemIdx);
  }
  const addToCart = () => {
    //Copy attributes when adding to cart
    if(selItem) { //If an item was selected
      cartItem.name = selItem.name;
      cartItem.code = selItem.code;
      cartItem.category = selItem.category;
      cartItem.price = selItem.price;
    }
    cartItem.txtObj = editorState;
    //!!!!!Must json stringify the draft-js object
    //If editing, just replace the item at the index
    if(editItemIdx >= 0) {
      setOrder({...order, cart: order.cart.map((item, idx)=>editItemIdx === idx ? cartItem : item)});
    } else {
      setOrder({...order, cart: [...order.cart, cartItem]});
    }
    resetState();
    //Open cart
    handleClick('cart');
  }
  const resetOpRes = () => setOpRes(initialOpState);

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
          <Navbar themeColor={EH_COLOR_DARK} 
            setDisplay={setDisplay} 
            user={{name: order.name, phone: order.phone, email: order.email}}
            handleEditCartItem={handleEditCartItem}
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
          {display === 'start' && (<ContactForm setDisplay={setDisplay}/>)}

          <Routes>
              <Route path="/" element={<Bundles/>}/>
              <Route path="bundles" element={<Bundles/>}/>
              <Route path="plaques-and-plates" element={
                <Plaque 
                  opRes={opRes} setOpRes={setOpRes}
                  selItem={selItem} setSelItem={setSelItem}
                  editorState={editorState} setEditorState={setEditorState}
                  autoTxtCenter={autoTxtCenter} setAutoTxtCenter={setAutoTxtCenter}
                  cartItem={cartItem} setCartItem={setCartItem}
                  addToCart={addToCart}
                  editItemIdx={editItemIdx}
                  cancelEditItem={()=>{resetState(); handleClick('cart')}}
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