import React, { useState } from 'react'
import { TbChevronRight, TbChevronLeft, TbChevronsRight, TbChevronsLeft } from 'react-icons/tb';
import { useStateContext } from '../../contexts/ContextProvider';

const SMALL_DEVICE_WIDTH = 768;
const PAGER_CONTROL_BUTTON_SIZE = 20;
const DISABLED_CLASS = "text-gray-300";
const FIRST_PAGE = 1;

const Pager = ({color, currentPage, setCurrentPage, numPages, pageCount, numRecords}) => {
    
    const { screenSize } = useStateContext();
    //Page window = window start + max page display
    const [pgWinStart, setPgWinStart] = useState(1);
    //If there's a next page, render the max window size for pages, otherwise render the rest
    const pgWinRenderSize = pgWinStart + pageCount > numPages ?
        numPages - pgWinStart + 1 : pageCount;
    
    //Pager sub-components
    const PagerControlButton = ({icon, customFunc}) => (
        <div>
            <button 
                className="p-2 ml-2"
                onClick={()=>customFunc()}
            >
                {icon}
            </button>
        </div>
    );
    const PageNumberSection = () => (
        <div id="page-numeric" className="mx-2 flex items-center justify-around">
        {[...Array(pgWinRenderSize)].map((page, pageIdx)=>{ 
                pageIdx += pgWinStart;
                return (
                <div key={`page-${pageIdx}`}>
                    <button 
                        className={`mx-2 w-6 h-6' ${currentPage == pageIdx  ? 'rounded-full' : 'text-slate-600'}`}
                        style={currentPage == pageIdx ? {background: color, color: 'white'} : null}
                        onClick={()=>{setCurrentPage(pageIdx)}}>
                        {pageIdx}
                    </button>
                </div>
            )})}
        </div>
        
    );
    const PagerInfo = () => (
        <div id="pager-msg" className="px-2 mx-3">
            <p className="text-sm">
                {`${currentPage} of ${numPages} pages (${numRecords} items)`}
            </p>
        </div>
    );

    const handleSkipToFirst = () => {
        if(currentPage === FIRST_PAGE) return;
        setCurrentPage(FIRST_PAGE);
        setPgWinStart(FIRST_PAGE);
    };
    const handleSkipToLast = () => {
        if(currentPage === numPages) return;
        setCurrentPage(numPages);
        //Set window based on the divisibility of the records / window size
        if(numPages % pageCount === 0) {
            setPgWinStart(numPages - pageCount + 1);
        } else {
            setPgWinStart((numPages / pageCount >> 0) * pageCount + 1);
        }
    };
    const handlePageForward = () => {
        if(currentPage === numPages) return;
        setCurrentPage(prevPage => prevPage + 1);
        //Window Size = right - left + 1 + 1 (since window is expanding)
        if(currentPage - pgWinStart + 2 > pageCount) 
            setPgWinStart(prevWindow => prevWindow + pageCount);
    };
    const handlePageBackward = () => {
        if(currentPage === FIRST_PAGE) return;
        setCurrentPage(prevPage => prevPage - 1);
        //Window Size = right - left + 1 - 1 (since window is shrinking)
        if(currentPage - pgWinStart === 0)
            setPgWinStart(prevWindow => prevWindow - pageCount);
    };

    return (
    <div id="pager-wrapper"
        className={`border-t-1 ${screenSize > SMALL_DEVICE_WIDTH ? 'flex justify-between items-center' : 'py-2'}`}
    >
        <div id="pager-control" className={`items-center flex ${screenSize > 900 ? 'mx-2 pl-1 py-1' : 'justify-evenly'}`}>
            <PagerControlButton icon={
                <TbChevronsLeft 
                    className={currentPage === FIRST_PAGE ? DISABLED_CLASS : ''} 
                    size={PAGER_CONTROL_BUTTON_SIZE}
                />}
                customFunc={handleSkipToFirst}
            />
            <PagerControlButton icon={
                <TbChevronLeft 
                    className={currentPage === FIRST_PAGE ? DISABLED_CLASS : ''} 
                    size={PAGER_CONTROL_BUTTON_SIZE}
                />}
                customFunc={handlePageBackward}
            />
            {screenSize > SMALL_DEVICE_WIDTH ? <PageNumberSection/> : <PagerInfo/>}
            <PagerControlButton icon={
                <TbChevronRight
                    className={currentPage === numPages ? DISABLED_CLASS : ''}  
                    size={PAGER_CONTROL_BUTTON_SIZE}
                />}
                customFunc={handlePageForward}
            />
            <PagerControlButton icon={
                <TbChevronsRight 
                    className={currentPage === numPages ? DISABLED_CLASS : ''} 
                    size={PAGER_CONTROL_BUTTON_SIZE}
                />}
                customFunc={handleSkipToLast}
            />
        </div>
        {screenSize > 900 ? <PagerInfo/> : null}
    </div>
  )
};

export default Pager