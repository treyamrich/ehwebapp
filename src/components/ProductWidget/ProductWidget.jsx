import React from 'react'
import './productwidget.css';

const ProductWidget = ({bundle}) => {
  return (
    <div className="h-100 w-60 drop-shadow-lg rounded-lg mr-4 mb-4 bg-white text-sm p-4">
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
}

export default ProductWidget