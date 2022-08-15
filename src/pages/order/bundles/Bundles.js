import React from 'react'
import { ProductSelector, Header } from '../../../components/index';

const bundles = [1, 2, 3, 4 , 5, 6, 7, 8, 9, 10];

const Bundles = () => {
  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category="Popular" title="Bundles" />
      <ProductSelector products={bundles} orientation="vertical"/>
    </div>
  )
}

export default Bundles