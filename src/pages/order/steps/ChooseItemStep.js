import React, { useState, useEffect } from 'react'
import { CardSelector, Tabs, Tab } from '../../../components';
import { fetchItems } from '../../../data/APICalls';
import { listItems } from '../../../graphql/queries';
import { useStateContext } from '../../../contexts/ContextProvider';
import { firstLetterUppercase } from '../../../utility/Strings';
import { EH_COLOR_DARK, AUTH_MODE_IAM } from '../../../data/uidata';

const ITEM_CATEGORIES = {
  "PLAQUE": [],
  "GIFT": [],
  "DRINKWARE": []
};

const ChooseItemTab = ({ selectedItem, setSelectedItem, initialItemChoices }) => {
  const [ itemChoices, setItemChoices ] = useState(initialItemChoices);
  return (
    <CardSelector 
        color={EH_COLOR_DARK}
        items={itemChoices} 
        setItems={setItemChoices}
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
  const [itemChoicesMap, setItemChoicesMap] = useState(() => new Map(Object.entries(ITEM_CATEGORIES)));

  const fetchInventoryItems = async () => {
    const items = await fetchItems(
      {listItems},
      AUTH_MODE_IAM,
      err=>setOpRes({...opRes, failureMsg: "Error: Could not fetch items."})
    );
    const itemMap = new Map(Object.entries(ITEM_CATEGORIES));
    //Add each item to the map based on category
    items.forEach(item => itemMap.get(item.category).push(item));
    setItemChoicesMap(itemMap);
  } 
  useEffect(()=>{
    fetchInventoryItems();
  }, []);

  return (
    <Tabs>
      {Object.keys(ITEM_CATEGORIES).map((category, idx) => (
        <Tab title={firstLetterUppercase(category)} key={idx}>
          <ChooseItemTab 
            selectedItem={selectedItem} 
            setSelectedItem={setSelectedItem}
            initialItemChoices={itemChoicesMap.get(category)}
          />
      </Tab>
      ))}
    </Tabs>
    
  )
}

export default ChooseItemStep