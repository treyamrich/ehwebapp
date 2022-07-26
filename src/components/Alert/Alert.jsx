import React, { useRef, useEffect} from 'react'
import './alert.css';
import { AiOutlineClose } from 'react-icons/ai';

const DEFAULT_DURATION = 10;

const Alert = ({children, variant, dismissible, onClose, duration}) => {

  const timer = useRef();

  const startTimer = () => {
    //On timeout, stop the timer and close the alert
    timer.current = setTimeout(()=>{
      clearTimeout(timer.current);
      onClose();
    }, 1000 * (duration ? duration : DEFAULT_DURATION));
  }
  useEffect(()=>{
    startTimer();
    return ()=> clearTimeout(timer.current);
  }, []);

  return (
    <div role="alert" aria-label="Close alert" className={`${variant} alert ${dismissible ? 'alert-dismissible' : ''}`}>
      
        {dismissible ? <button className="px-4 py-5 absolute top-0 right-0 box-border"
          onClick={()=>onClose()}
        >
          <AiOutlineClose className="text-2xl" />
        </button> : null}
        {children}lkdfsljasdoifghasdfi
    </div>
  )
}

export default Alert