import React, { useState } from 'react'
import { TbChevronRight, TbChevronLeft, TbChevronsRight, TbChevronsLeft } from 'react-icons/tb';
import { useStateContext } from '../../contexts/ContextProvider';

const PAGER_CONTROL_BUTTON_SIZE = 20;

export const Pager = ({color, currentPage, setCurrentPage, numPages, maxPageDisplay, numRecords}) => {

    const { screenSize } = useStateContext();

    const PagerControlButton = ({icon}) => (
        <div>
            <button className="p-2 ml-2">
                {icon}
            </button>
        </div>
    );
    const PageNumberSection = () => (
        <div id="page-numeric" className="mx-2 flex items-center justify-around">
        {[...Array(numPages)].map((page, pageIdx)=>(
            <div key={`page-${pageIdx}`}>
            <button 
                className={`mx-2 w-6 h-6' ${currentPage == pageIdx+1 ? 'rounded-full' : 'text-slate-600'}`}
                style={currentPage == pageIdx+1 ? {background: color, color: 'white'} : null}
                onClick={()=>{setCurrentPage(pageIdx+1)}}>
                {pageIdx+1}
            </button>
        </div>
        ))}
        </div>
        
    );
    const PagerInfo = () => (
        <div id="pager-msg" className="px-2 mx-3">
            <p className="text-sm">
                {`${currentPage} of ${numPages} pages (${numRecords} items)`}
            </p>
        </div>
    );

    return (
    <div id="pager-wrapper"
        className={`border-t-1 ${screenSize > 900 ? 'flex justify-between items-center' : 'py-2'}`}
    >
        <div id="pager-control" className={`items-center flex ${screenSize > 900 ? 'mx-2 pl-1 py-1' : 'justify-evenly'}`}>
            <PagerControlButton icon={<TbChevronsLeft size={PAGER_CONTROL_BUTTON_SIZE}/>}/>
            <PagerControlButton icon={<TbChevronLeft size={PAGER_CONTROL_BUTTON_SIZE}/>}/>
            {screenSize > 900 ? <PageNumberSection/> : <PagerInfo/>}
            <PagerControlButton icon={<TbChevronRight size={PAGER_CONTROL_BUTTON_SIZE}/>}/>
            <PagerControlButton icon={<TbChevronsRight size={PAGER_CONTROL_BUTTON_SIZE}/>} />
        </div>
        {screenSize > 900 ? <PagerInfo/> : null}
    </div>
  )
};