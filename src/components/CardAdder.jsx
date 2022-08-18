import React, { useState } from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { GoDiffAdded } from 'react-icons/go';
import { PopUp } from '.';

const Card = ({cardName, options, setOptions}) => {
  const handleRemoveCard = () => {
    let i = 0;
    let found = false;
    let newOpts = [];
    while(i < options.length) {
      //Skip the card to remove
      if(options[i] == cardName && !found) {
        found = true;
      } else {
        newOpts.push(options[i]);
      }
      i++;
    }
    setOptions(newOpts);
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
        <div className="w-full h-28 px-1 pb-1 mt-10 mb-1 border-2 border-red-300">
          <div className="h-20 border-1 border-blue-300 mb-1">

          </div>
          <p className="font-semibold">{cardName}</p>
        </div>
    </div>
)}

const CardAdder = ({ title, options, setOptions, addComponent}) => {
  const [showAddComp, setShowAddComp] = useState(false);
  return (
    <div className="h-52 border-1 rounded-sm overflow-x-auto">
      {showAddComp ? <PopUp title={title} closePopUp={()=>setShowAddComp(false)}>
          { addComponent }
        </PopUp> : null}
      <div className="flex p-4 h-full items-center">
        <div className="flex justify-center items-center p-4 rounded-lg mr-4 text-sm hover:text-gray-400 bg-gray-200 text-gray-500 box-border"
          style={{ minWidth: '5rem'}}
          onClick={()=>setShowAddComp(true)}
        >
            <button type="button"
              className="select-none"
            >
              <GoDiffAdded size={25}/>
            </button>
        </div>
        {options.map((option, idx)=>(
            <Card key={idx} 
              cardName={option} 
              options={options}
              setOptions={setOptions}
            />
        ))}
      </div>
    </div>
  )
}

export default CardAdder