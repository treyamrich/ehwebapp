import React from 'react'
import { MdOutlineCancel } from 'react-icons/md';
import { GoDiffAdded } from 'react-icons/go';

const Card = () => (
    <div className="relative px-2 hover:drop-shadow-lg rounded-lg mr-4 bg-white text-sm"
      style={{minWidth: '12rem'}}
    >
        <div className="absolute top-1 right-1">
            <button
              type="button"
              onClick={() =>{}}
              style={{ color: 'rgb(153, 171, 180)', borderRadius: '50%' }}
              className="text-xl p-2 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <MdOutlineCancel />
            </button>
        </div>
        <div className="w-full h-28 px-1 pb-1 mt-10 mb-1 border-2 border-red-300">
          <div className="h-20 border-1 border-blue-300 mb-1">

          </div>
          <p className="font-semibold">Graphic name</p>
        </div>
    </div>
)

const CardAdder = ({ onChange, options}) => {
  return (
    <div className="h-52 border-1 rounded-sm overflow-x-auto">
      <div className="flex p-4 h-full items-center">
        {options.map((option, idx)=>(
            <Card key={idx} name={option}/>
        ))}
        <div className="flex justify-center items-center w-20 p-4 rounded-lg mr-4 bg-gray-100 text-sm text-gray-300 hover:bg-gray-200 hover:text-gray-600">
            <button type="button">
                <GoDiffAdded size={25}/>
            </button>
        </div>
      </div>
    </div>
  )
}

export default CardAdder