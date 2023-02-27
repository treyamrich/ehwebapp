import React from 'react'
import { Header } from '.';

const Page = ({ category, title, children}) => {
  return (
    <div className="m-2 md:m-3 mt-16 p-2 md:p-10 rounded-3xl bg-slate-50">
      <Header category={category} title={title} />
      {children}
    </div>
  )
}

export default Page