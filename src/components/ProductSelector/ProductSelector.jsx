import React from 'react';
import './product_card.css';
import { AiOutlineCheck } from 'react-icons/ai';

const ProductCard = ({selected, onClick}) => {
    return (
        <div className="h-100 w-60 p-4 drop-shadow-lg rounded-lg mr-4 mb-4 bg-white text-sm"
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

const ProductSelector = ({ products, orientation, selectedIdx, setSelectedIdx }) => {
  return (
    <div className={`flex p-1 ${orientation === 'vertical' ? 'justify-center flex-wrap' : ''}`}>
    {products.map((product, idx) =>(
        <ProductCard key={idx} product={product} selected={selectedIdx === idx} onClick={()=>setSelectedIdx(idx)}/>
    ))}
    </div>
  )
}

export default ProductSelector