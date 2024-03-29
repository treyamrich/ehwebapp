import React, { useRef, useEffect } from 'react';
import { formatDate } from '../../../utility/DateTimeFunctions';
import './contact_form.css';

import { useStateContext } from '../../../contexts/ContextProvider';
import { LocationSelector } from '../order-components';

const ContactForm = ({ setDisplay}) => {

  const { order, setOrder } = useStateContext();
  const today = useRef(formatDate(new Date()));
  const { name, phone, email } = order;
  
  const submitContact = nextDisplay => {
    setDisplay(nextDisplay);
  }

  //Get today's date 
  useEffect(()=>{
    setOrder({...order, dateNeeded: today.current});
  }, []);
  return (
    <div className="bg-white w-screen fixed top-0 right-0 h-screen"
      style={{zIndex: '10000'}}
    >
      <div className="flex items-center justify-center h-full overflow-auto p-4">
        <div className="flex flex-col relative sm:border-1 p-8 w-full sm:w-3/4 lg:w-2/3 xl:w-1/3 2xl:w-1/4  max-h-screen">
          <div className="text-center text-2xl">
            <h4>Welcome!</h4>
            <h4>Please fill out your <span className="font-semibold">Contact info</span>.</h4>
          </div>
          <form>
            <div className="border-y-1 border-gray-100 my-6 p-5">
              <label className="text-lg font-semibold" htmlFor="name">Name</label>
              <input type="text" name="name"
                className="border px-3 py-2 w-full rounded-sm mb-4"
                placeholder="Full Name"
                onChange={(e)=>setOrder({...order, name: e.target.value})}
                value={name}
              />
              <label className="text-lg font-semibold" htmlFor="phone">Phone Number</label>
              <input type="text" name="phone"
                className="border px-3 py-2 w-full rounded-sm mb-4"
                placeholder="Enter cell number"
                onChange={(e)=>setOrder({...order, phone: e.target.value})}
                value={phone}
              />
              <label className="text-lg font-semibold" htmlFor="email">Email</label>
              <input type="text" name="email"
                className="border px-3 py-2 w-full rounded-sm mb-4"
                placeholder="example@gmail.com"
                onChange={(e)=>setOrder({...order, email: e.target.value})}
                value={email}
              />
              <label className="text-lg font-semibold" htmlFor="location">Pickup Location</label>
              <LocationSelector/>
              <label className="text-lg font-semibold" htmlFor="date-needed">Date Order Needed</label>
              <input type="date" name="date-needed"
                className="border px-3 py-2 w-full rounded-sm mb-4"
                onChange={e=>setOrder({...order, dateNeeded: e.target.value})}
                value={order.dateNeeded}
                min={today.current}
              />
              <div className="text-center">
                <p className="text-slate-500 text-sm">The minimum turnaround time is 4-5 days. Rush options may be available.</p>
              </div>
            </div>
          </form>
          <button
            type="button"
            onClick={()=>submitContact('order')}
            className="btn-positive text-white rounded-sm p-4 text-lg font-bold mb-4"
          >
              Order Now
          </button>
          <button
            type="button"
            onClick={()=>setDisplay('order')}
            className="btn-info text-white rounded-sm p-4 text-lg font-bold"
          >
              Receive a quote
          </button>
        </div>
      </div>
    </div>
  )
}

export default ContactForm