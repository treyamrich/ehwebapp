import React, { useState, useEffect } from 'react'
import { CardSelector, Tabs, Tab } from '../../../components';
import { fetchItems } from '../../../data/APICalls';
import { listItems } from '../../../graphql/queries';
import { useStateContext } from '../../../contexts/ContextProvider';
import { firstLetterUppercase } from '../../../utility/Strings';
import { EH_COLOR_DARK, AUTH_MODE_IAM, AUTH_MODE_COGNITO } from '../../../data/uidata';

const ChooseItemTab = ({ selectedItem, setSelectedItem, choices, setChoices }) => {
  return (
    <CardSelector 
        color={EH_COLOR_DARK}
        items={choices} 
        setItems={setChoices}
        orientation="horizontal"
        selectedCard={selectedItem}
        setSelectedCard={setSelectedItem}
        isCardDisabled={()=>false}
        cmpField="name"
      />
  )
}
const ChooseItemStep = ({ selectedItem, setSelectedItem }) => {
  const { opRes, setOpRes } = useStateContext();
  const [plaques, setPlaques] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [drinkware, setDrinkware] = useState([]);

  const fetchInventoryItems = async () => {
    //Get items
    const items = await fetchItems(
      {listItems},
      AUTH_MODE_COGNITO,
      err=>setOpRes({...opRes, failureMsg: "Error: Could not fetch items."})
    );

    const ITEM_CATEGORIES = {
      "PLAQUE": [],
      "GIFT": [],
      "DRINKWARE": []
    };
    const itemMap = new Map(Object.entries(ITEM_CATEGORIES));

    //Add each item to the map based on category
    items.forEach(item => itemMap.get(item.category).push(item));
    setPlaques(itemMap.get("PLAQUE"));
    setGifts(itemMap.get("GIFT"));
    setDrinkware(itemMap.get("DRINKWARE"));
  } 
  useEffect(()=>{
    fetchInventoryItems();
  }, []);

  return (
    <Tabs>
      <Tab title="Plaques">
          <ChooseItemTab 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}
            choices={plaques}
            setChoices={setPlaques}
          />
      </Tab>
      <Tab title="Gifts">
          <ChooseItemTab 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}
            choices={gifts}
            setChoices={setGifts}
          />
      </Tab>
      <Tab title="Drinkware">
          <ChooseItemTab 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}
            choices={drinkware}
            setChoices={setDrinkware}
          />
      </Tab>
    </Tabs>
    
  )
}

export default ChooseItemStep