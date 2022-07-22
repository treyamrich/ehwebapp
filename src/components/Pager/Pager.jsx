import React, { useState } from 'react'
import { TbChevronRight, TbChevronLeft, TbChevronsRight, TbChevronsLeft } from 'react-icons/tb';

const PagerNumberButton = ({pageNum, bgColor, displayPage, setDisplayPage}) => (
    <div>
        <button 
            className={`mx-2 w-6 h-6' ${displayPage == pageNum ? 'rounded-full' : 'text-slate-600'}`}
            style={displayPage == pageNum ? {background: bgColor, color: 'white'} : null}
            onClick={()=>{setDisplayPage(pageNum)}}>
            {pageNum}
        </button>
    </div>
);
const PagerControlButton = ({icon}) => (
    <div>
        <button className="p-2 ml-2">
            {icon}
        </button>
    </div>
);
const PAGER_CONTROL_BUTTON_SIZE = 20;

export const Pager = ({color}) => {
    const [displayPage, setDisplayPage] = useState(1);
    const [pages, setPages] = useState([]);
  return (
    <div id="pager-wrapper"
        className="flex justify-between"
    >
        <div id="pager-control" className="flex mx-2 pl-1 py-1 items-center">
            <PagerControlButton icon={<TbChevronsLeft size={PAGER_CONTROL_BUTTON_SIZE}/>}/>
            <PagerControlButton icon={<TbChevronLeft size={PAGER_CONTROL_BUTTON_SIZE}/>}/>
            <div id="page-numeric" className="mx-2 flex items-center justify-around">
                {pages.map((page, idx)=>(
                    <PagerNumberButton key={`page-${idx}`} pageNum={idx}
                    displayPage={displayPage} 
                    setDisplayPage={setDisplayPage}
                    bgColor={color}/> 
                ))}
            </div>
            <PagerControlButton icon={<TbChevronRight size={PAGER_CONTROL_BUTTON_SIZE}/>}/>
            <PagerControlButton icon={<TbChevronsRight size={PAGER_CONTROL_BUTTON_SIZE}/>} />
        </div>
        <div id="pager-msg">
            <p>

            </p>
        </div>
    </div>
  )
};