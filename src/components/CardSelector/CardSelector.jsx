import React from 'react';
import { SearchBar } from '..';
import './card_selector.css';
import { AiOutlineCheck } from 'react-icons/ai';

const Card = ({ cardName, cardImg, selected, onClick, disabled, highlightOnSelect }) => {
    return (
        <div className="relative w-60 h-full px-4 pt-4 pb-1 drop-shadow-md hover:drop-shadow-lg rounded-lg bg-white text-sm"
            style={{minWidth: '15rem', outline: selected && highlightOnSelect ? '1px solid blue' : '', opacity: disabled ? 0.3 : 1}}
            onClick={disabled ? null : onClick}
        >
            {selected && highlightOnSelect ? <div className="absolute top-3 right-3"><AiOutlineCheck color={'blue'}/></div> : null}
            <div className="p-1">
                <img src={cardImg} 
                    style={{maxWidth: "200px", maxHeight: "200px"}}
                    alt="Image unavailable"
                />
            </div>
            <div>
                <p className="font-semibold text-xs">{ cardName }</p>
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
:cmpField - a field on the object to compare for reselection
:highlightOnSelect - boolean to specify if a card should be highlighted when selected
:emptyMsg: a string that is displayed when no items are in the items array

*Each item in items must have a label and image property*

*/
const CardSelector = ({ items, setItems, orientation, selectedCard, setSelectedCard, onSelect, onReselect, disabled, isCardDisabled, color, cmpField, highlightOnSelect, emptyMsg }) => {
    const isSameCard = card => {
        //Ensure a cards are passed
        return selectedCard && card[cmpField] === selectedCard[cmpField];
    }
    //Postcondition: selected card = null if card is reselected
    const handleSelect = selItem => {
        //Handle reselect
        if(isSameCard(selItem)) {
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
                searchFields={['label']}
            />
        </div>
        <div className={`flex p-1 h-full relative gap-4 ${orientation === 'vertical' ? 'justify-center flex-wrap' : ''}`}
            style={{opacity: disabled ? 0.5 : 1}}
        >
        {items.length > 0 ? null :  <p className="font-semibold text-sm text-slate-400">{emptyMsg}</p>}
        {items.map((item, idx) =>(
            <Card key={idx} 
                cardName={item.label}
                selected={isSameCard(item)} 
                onClick={()=>handleSelect(item)}
                disabled={disabled || isCardDisabled(item)}
                highlightOnSelect={highlightOnSelect}
                cardImg={item.image}
            />
        ))}
        </div>
    </div>
  )
}

export default CardSelector