import React from 'react';
import './card_selector.css';
import { AiOutlineCheck } from 'react-icons/ai';

const Card = ({selected, onClick}) => {
    return (
        <div className="relative h-100 w-60 p-4 hover:drop-shadow-lg rounded-lg mr-4 mb-4 bg-white text-sm"
            style={{minWidth: '15rem', outline: selected ? '1px solid blue' : ''}}
            onClick={onClick}
        >
            {selected ? <div className="absolute top-3 right-3"><AiOutlineCheck color={'blue'}/></div> : null}
            <div className="p-5">
                <img src="https://www.plaquemaker.com/site/images/Products/PL-ALM-PH_main-001.jpg" className="h-50 w-50"/>
            </div>
            <div>
                <h6 className="font-semibold">Bundle Name</h6>
                <ul className="text-xs">
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                </ul>
            </div>
            <button
                className="rounded-sm px-3 py-2 absolute bottom-0 right-0 add-button"
            >Add to cart</button>
        </div>
    )
};

const CardSelector = ({ items, orientation, selectedIdx, setSelectedIdx, onSelect, disabled }) => {
    //Postcondition: selectedIdx is -1 if card is reselected/deselected
    const handleSelect = idx => {
        //Handle reselect
        setSelectedIdx(selectedIdx == idx ? -1 : idx);
        //Call callback func if provided
        if(onSelect) {
            try {
                onSelect();
            } catch(e) {
                console.log(e);
            }
        }
    }
  return (
    <div className={`flex p-1 h-full relative ${orientation === 'vertical' ? 'justify-center flex-wrap' : ''}`}>
    {disabled === true && (
        <div className="bg-half-transparent absolute h-full w-full top-0 left-0 rounded-md"
            style={{zIndex: "1000"}}
        />
    )}
    {items.map((product, idx) =>(
        <Card key={idx} product={product} selected={selectedIdx === idx} onClick={()=>handleSelect(idx)}/>
    ))}
    </div>
  )
}

export default CardSelector