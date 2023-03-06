import React from 'react'
import { CardSelector, Header } from '../../../components/index';

const bundles = [1, 2, 3, 4 , 5, 6, 7, 8, 9, 10];

const Card = ({ onClick }) => {
  return (
      <div className="relative h-100 w-60 p-4 hover:drop-shadow-lg rounded-lg mr-4 mb-4 bg-white text-sm"
          style={{minWidth: '15rem'}}
          onClick={onClick}
      >
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

const Bundles = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Popular" title="Bundles" />
      <CardSelector items={bundles} orientation="vertical" isCardDisabled={()=>false} emptyMsg="No bundles"/>
    </div>
  )
}

export default Bundles