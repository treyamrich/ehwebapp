import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { GoDiffAdded } from 'react-icons/go';

const Card = () => (
    <div className="flex flex-col w-28 p-4 hover:drop-shadow-lg rounded-lg mr-4 bg-white text-sm">
        <div className="flex justify-right">
            <button
              type="button"
              onClick={() =>{}}
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-2xl p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
        </div>
        <div className="w-16 border-2 border-red-300">

        </div>
        <h6 className="font-semibold">AC130 Inbound</h6>
    </div>
)

const CardAdder = ({ onChange, options}) => {
  return (
    <div className="flex w-full p-4 h-28 border-1 rounded-sm">
    {options.map((option, idx)=>(
        <Card key={idx} name={option}/>
    ))}
        <div className="flex justify-center items-center w-28 p-4 rounded-lg mr-4 bg-gray-100 text-sm text-gray-300 hover:bg-gray-200 hover:text-gray-600">
            <button>
                <GoDiffAdded size={25}/>
            </button>
        </div>
    </div>
  )
}

export default CardAdder