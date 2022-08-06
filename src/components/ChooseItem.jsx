import React, { useState } from 'react'
import { ProductSelector } from '.';

const ChooseItem = ({ items }) => {
    const [selectedIdx, setSelectedIdx] = useState(null);
  return (
    <div>
        <ProductSelector products={items} orientation="horizontal" selectedIdx={selectedIdx} setSelectedIdx={setSelectedIdx}/>
    </div>
  )
}

export default ChooseItem