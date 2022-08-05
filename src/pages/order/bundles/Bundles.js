import React from 'react'
import { ProductWidget } from '../../../components/index';

const bundles = [];

const Bundles = () => {
  return (
    <div>
      {bundles.map(() =>(
        <ProductWidget/>
      ))}
    </div>
  )
}

export default Bundles