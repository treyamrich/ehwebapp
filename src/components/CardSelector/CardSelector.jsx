import React from 'react';
import { SearchBar } from '..';
import './card_selector.css';
import { AiOutlineCheck } from 'react-icons/ai';

const Card = ({ cardName, selected, onClick, disabled }) => {
    return (
        <div className="relative h-100 w-60 p-4 drop-shadow-md hover:drop-shadow-lg rounded-lg mr-4 mb-4 bg-white text-sm"
            style={{minWidth: '15rem', outline: selected ? '1px solid blue' : '', opacity: disabled ? 0.3 : 1}}
            onClick={disabled ? null : onClick}
        >
            {selected ? <div className="absolute top-3 right-3"><AiOutlineCheck color={'blue'}/></div> : null}
            <div className="p-5">
                <img src="https://www.plaquemaker.com/site/images/Products/PL-ALM-PH_main-001.jpg" className="h-50 w-50"/>
            </div>
            <div>
                <p className="font-semibold">{ cardName }</p>
            </div>
        </div>
    )
};

/*Interface Invariant

Card Selector Props

:items - a list of objects {name: string, img: string}
:orientation - string (horizontal/vertical)
:selectedCard and setSelectedCard - react useState hook to keep track of selected card
:onSelect - func to call when a card is selected
:onReselect - func to call when a card is deselected
:disabled - boolean if the entire selector is disabled
:isCardDisabled - a func which accepts the items[i] object to determine if it's disabled
*/
const CardSelector = ({ items, setItems, orientation, selectedCard, setSelectedCard, onSelect, onReselect, disabled, isCardDisabled, color }) => {
    //Postcondition: selectedIdx is -1 if card is reselected/deselected
    const handleSelect = selItem => {
        //Handle reselect
        if(selItem == selectedCard) {
            if(onReselect) {
                try {
                    onReselect();
                } catch(e) {
                    console.log(e);
                }
            }
            setSelectedCard(null);
            return;
        }
        //Handle select
        if(onSelect) {
            try {
                onSelect();
            } catch(e) {
                console.log(e);
            }
        }
        setSelectedCard(selItem);
    }
  return (
    <div className={orientation === 'horizontal' ? "overflow-x-auto" : ""}>
        <div className="flex justify-end mb-3 px-3">
            <SearchBar 
                color={color}
                records={items}
                setRecords={setItems}
                searchFields={['name']}
            />
        </div>
        <div className={`flex p-1 h-full relative ${orientation === 'vertical' ? 'justify-center flex-wrap' : ''}`}
            style={{opacity: disabled ? 0.5 : 1}}
        >
        {items.map((item, idx) =>(
            <Card key={idx} 
                cardName={item.name}
                selected={selectedCard && selectedCard.name === item.name} 
                onClick={()=>handleSelect(item)}
                disabled={disabled || isCardDisabled(item)}
            />
        ))}
        </div>
    </div>
  )
}

export default CardSelector