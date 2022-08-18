import React, { useState, Children } from 'react'

const TabNav = ({ title, active, onClick }) => (
    <li className="inline">
        <button type="button" 
            className="py-2 px-3 rounded-t-md text-xs sm:text-sm"
            onClick={onClick}
            style={ active ? 
                { color: 'white', 
                    background: 'black',
                } : {
                    color: '#C39F7F', background: 'none'
                }
            }
        >
        { title }
        </button>
    </li>
);

const Tabs = ({ children }) => {
    const [activeTab, setActiveTab] = useState(0);
    const childArr = Children.toArray(children);
    
  return (
    <div id="tabs-wrapper">
        <ul id="tab-nav" className="list-none mb-4 border-black border-b-1">
            {childArr.map((tabChild, idx) => (
                <TabNav key={idx}
                    title={tabChild.props.title} 
                    active={activeTab === idx}
                    onClick={()=>setActiveTab(idx)}
                />
            ))}
        </ul>
        <div id="tab-content">
            { childArr[activeTab] }
        </div>
    </div>
  )
}

export default Tabs