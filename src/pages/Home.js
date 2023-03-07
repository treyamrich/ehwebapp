import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import { Landing } from './index';
import { Navbar } from '../components/index';

const Home = ({isAuthenticated, name, signOut}) => {
  return (
    <div className="relative dark:bg-main-dark-bg">
        <div
              className='bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2'
        >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
                <Navbar user={{name: 'asdf'}}/>
            </div>
            <div>
                <h1 className="text-7xl text-blue-500 underline"><Link to="/management">GO TO MANAGEMENT PORTAL</Link></h1>
                <h1 className="text-7xl text-blue-500 underline"><Link to="/order">GO TO ORDER</Link></h1>
                <button onClick={signOut} className="border w-48 bg-slate-300">Sign Out</button>
                <Routes>
                    <Route element={<Landing/>} path="/"/>
                </Routes>
            </div>
        </div>
    </div>
  )
}

export default Home