/*Interface invariant

CardManager props:

:options - an array of objects to display as cards
:setOptions - a react useState function to set the cards and rerender
:onAddCard - a function called when the user hits the add button
:onDeleteCard - a function when the user hits the delete card button. This
  function will be passed an array of the new options.
  
Note: This component provides event handlers for the client. The client must
  handle rerenders for adding and deleting cards.
*/
import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { GoDiffAdded } from 'react-icons/go';

const Card = ({ idx, cardName, cardImg, options, onDeleteCard, onEditCard }) => {
  const handleRemoveCard = () => {
    let newOpts = [];
    for(let i = 0; i < options.length; i++) {
      if(i == idx) continue;
      newOpts.push(options[i]);
    }
    onDeleteCard(newOpts);
  }
  return (
    <div className="relative px-2 hover:drop-shadow-lg rounded-lg mr-4 bg-white text-sm"
      style={{minWidth: '12rem'}}
    >
        <div className="absolute top-1 right-1">
            <button
              type="button"
              onClick={handleRemoveCard}
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-xl p-2 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
        </div>
        <div className="absolute top-1 right-8">
            <button
              type="button"
              onClick={()=>onEditCard(idx)}
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-xl p-2 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <AiOutlineEdit />
            </button>
        </div>
        <div className="w-full h-28 px-1 pb-1 mt-10 mb-1 border-2 border-red-300"
        >
          <div className="h-20 border-1 border-blue-300 mb-1">
            <img src={cardImg}/>
          </div>
          <p className="font-semibold">{cardName}</p>
        </div>
    </div>
)}

const CardManager = ({ options, onDeleteCard, onAddCard, onEditCard}) => {
  return (
    <div className="h-52 border-1 rounded-sm overflow-x-auto">
      <div className="flex p-4 h-full items-center">
        <div className="flex justify-center items-center p-4 rounded-lg mr-4 text-sm hover:text-gray-400 bg-gray-200 text-gray-500 box-border"
          style={{ minWidth: '5rem'}}
          onClick={onAddCard}
        >
            <button type="button"
              className="select-none"
            >
              <GoDiffAdded size={25}/>
            </button>
        </div>
        {options.map((option, idx)=>(
            <Card key={idx} 
              idx={idx}
              cardName={option.name} 
              cardImg={option.img}
              options={options}
              onDeleteCard={onDeleteCard}
              onEditCard={onEditCard}
            />
        ))}
      </div>
    </div>
  )
}

export default CardManager