import React, { useState } from 'react'
import { CardSelector } from '../../components';
import { testItems } from '../../data/dummy';

const ChooseItemStep = ({ themeColor, selectedItem, setSelectedItem }) => {
    const [itemChoices, setItemChoices] = useState(testItems);

  return (
    <CardSelector 
        color={themeColor}
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