import React, { useState } from 'react'
import { CardSelector } from '../../components';
import { testItems } from '../../data/dummy';
import { EH_COLOR_DARK } from '../../data/uidata';
const ChooseItemStep = ({ selectedItem, setSelectedItem }) => {
    const [itemChoices, setItemChoices] = useState(testItems);

  return (
    <CardSelector 
        color={EH_COLOR_DARK}
        items={itemChoices} 
        setItems={setItemChoices}
        orientation="horizontal"
        selectedCard={selectedItem}
        setSelectedCard={setSelectedItem}
        isCardDisabled={()=>false}
    />
  )
}

export default ChooseItemStep